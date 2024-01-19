import React, { useState } from 'react';
import './PropertyInfo.css'
import { findUserByToken } from '../api/users';
import { addReport } from '../api/report';

const ReportPublication = ({ propertyData }) => {
  const [reportReason, setReportReason] = useState('');

  const handleReportReasonChange = (event) => {
    setReportReason(event.target.value);
  };

  const currentDate = new Date();
  
  const handleReportPublication = async () => {
    try {
      // Validar que el campo reportReason no esté vacío
      if (!reportReason) {
        alert('Por favor, ingresa el motivo del reporte.');
        return;
      }

      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const user = await findUserByToken(token);
      const reportData = {
        reporter: user.data.name,
        reported_id: propertyData._id,
        propertyName: propertyData.name,
        description: reportReason,
        date: currentDate.toISOString().slice(0, 10),
      };

      const res = await addReport(reportData);
      console.log(res);

      setReportReason('');
      alert('Reporte enviado con éxito.');
    } catch (error) {
      console.error("Error al enviar el reporte:", error);
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
