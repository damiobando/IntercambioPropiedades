// ReportPublication.js

import React, { useState } from 'react';
import './PropertyInfo.css'
import { findUserByToken } from '../api/users';
import {addReport} from '../api/report';


const ReportPublication = ({ownerID}) => {
  const [reportReason, setReportReason] = useState('');

  const handleReportReasonChange = (event) => {
    setReportReason(event.target.value);
  };
  const currentDate = new Date();
  const handleReportPublication = async () => {
    try{
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const user = await findUserByToken(token);
      const reportData = {
        reporter_id: user.data._id,
        reported_id: ownerID,
        description: reportReason,
        date: currentDate.toISOString().slice(0, 10),
      };
      console.log(reportData);//
      const res = await addReport(reportData);
      console.log(res);    
      setReportReason('');
     }
     catch(res){
        console.error("Error al enviar mensaje", res);
     }
  };

  return (
    <div className='report-container'>
      <h2>Reportar Publicación</h2>
      <textarea
        value={reportReason}
        onChange={handleReportReasonChange}
        placeholder="Motivo del reporte..."
        rows={4}
      />
      <button onClick={handleReportPublication}>Reportar</button>
    </div>
  );
};

export default ReportPublication;
