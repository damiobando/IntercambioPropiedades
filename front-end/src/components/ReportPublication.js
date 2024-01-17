// ReportPublication.js

import React, { useState } from 'react';
import './PropertyInfo.css'

const ReportPublication = () => {
  const [reportReason, setReportReason] = useState('');

  const handleReportReasonChange = (event) => {
    setReportReason(event.target.value);
  };

  const handleReportPublication = () => {
    // Aquí puedes implementar la lógica para reportar la publicación
    console.log('Reporte enviado con motivo:', reportReason);
    // Puedes limpiar el campo de motivo después de enviarlo
    setReportReason('');
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
