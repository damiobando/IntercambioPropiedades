// FeedbackForm.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from './Button';
import './Feedback.css'; // Importa los estilos

function Feedback({ onFeedbackSubmit }) {
  const [feedbackData, setFeedbackData] = useState({
    comment: '',
    rating: '',
  });

  const handleInputChange = (field) => (event) => {
    setFeedbackData({ ...feedbackData, [field]: event.target.value });
  };

  const handleFeedbackSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos del feedback
    // Puedes enviarlos al servidor, mostrar una alerta, etc.
    onFeedbackSubmit(feedbackData);
    // También puedes limpiar el estado o cerrar el componente después de enviar el feedback.
    setFeedbackData({
      comment: '',
      rating: '',
    });
  };

  return (
    <div className='feedback-form-container'>
      <h2>Deja tu Feedback</h2>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='feedback-comment'>Comentario</InputLabel>
          <Input
            id='feedback-comment'
            value={feedbackData.comment}
            onChange={handleInputChange('comment')}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='feedback-rating'>Calificación</InputLabel>
          <Input
            id='feedback-rating'
            type='number'
            min='1'
            max='5'
            value={feedbackData.rating}
            onChange={handleInputChange('rating')}
          />
        </FormControl>
      </Box>
      <div className='btn-feedback'>
        <Button buttonStyle='btn--outline' onClick={handleFeedbackSubmit}>
          Enviar Feedback
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
