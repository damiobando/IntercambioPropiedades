// UserReport.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from './Button';
import './Report.css'; // Importa los estilos

function Report({ onReportSubmit }) {
  const [reportData, setReportData] = useState({
    reported_name: '',
    type: '',
    description: '',
  });

  const handleInputChange = (field) => (event) => {
    setReportData({ ...reportData, [field]: event.target.value });
  };

  const handleReportSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos del reporte
    // Puedes enviarlos al servidor, mostrar una alerta, etc.
    onReportSubmit(reportData);
    // También puedes limpiar el estado o cerrar el componente después de enviar el reporte.
    setReportData({
      reported_name: '',
      type: '',
      description: '',
    });
  };

  return (
    <div className='user-report-container'>
      <h2>Reportar Usuario</h2>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='reported-name'>Nombre del Reportado</InputLabel>
          <Input
            id='reported-name'
            value={reportData.reported_name}
            onChange={handleInputChange('reported_name')}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='report-type'>Tipo de Reporte</InputLabel>
          <Input
            id='report-type'
            value={reportData.type}
            onChange={handleInputChange('type')}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='report-description'>Descripción del Reporte</InputLabel>
          <Input
            id='report-description'
            value={reportData.description}
            onChange={handleInputChange('description')}
          />
        </FormControl>
      </Box>
      <div className='btn-report'>
        <Button buttonStyle='btn--outline' onClick={handleReportSubmit}>
          Enviar Reporte
        </Button>
      </div>
    </div>
  );
}

export default Report;
