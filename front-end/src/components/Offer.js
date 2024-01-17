// OfferForm.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from './Button';
import './Offer.css'; // Importa los estilos

function Offer({ onOfferSubmit }) {
  const [offerData, setOfferData] = useState({
    amount: '',
    description: '',
  });

  const handleInputChange = (field) => (event) => {
    setOfferData({ ...offerData, [field]: event.target.value });
  };

  const handleOfferSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos de la oferta
    // Puedes enviarlos al servidor, mostrar una alerta, etc.
    onOfferSubmit(offerData);
    // También puedes limpiar el estado o cerrar el componente después de enviar la oferta.
    setOfferData({
      amount: '',
      description: '',
    });
  };

  return (
    <div className='offer-form-container'>
      <h2>Hacer una Oferta</h2>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='offer-amount'>Monto de la Oferta</InputLabel>
          <Input
            id='offer-amount'
            value={offerData.amount}
            onChange={handleInputChange('amount')}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='offer-description'>Descripción de la Oferta</InputLabel>
          <Input
            id='offer-description'
            value={offerData.description}
            onChange={handleInputChange('description')}
          />
        </FormControl>
      </Box>
      <div className='btn-offer'>
        <Button buttonStyle='btn--outline' onClick={handleOfferSubmit}>
          Hacer Oferta
        </Button>
      </div>
    </div>
  );
}

export default Offer;
