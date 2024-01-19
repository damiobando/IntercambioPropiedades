// ContactUs.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from './Button';
import './Feedback.css'; // Importa los estilos
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Feedback({ onFeedbackSubmit }) {
  const [feedbackData, setFeedbackData] = useState({
    comment: '',
    rating: 0,
  });

  const handleInputChange = (field) => (event) => {
    setFeedbackData({ ...feedbackData, [field]: event.target.value });
  };

  const handleStarClick = (rating) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const handleFeedbackSubmit = () => {
    onFeedbackSubmit(feedbackData);
    setFeedbackData({
      comment: '',
      rating: 0,
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= feedbackData.rating ? 'filled' : 'empty'}`}
          onClick={() => handleStarClick(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='contact-us-container'>
      <div className='contact-info-container'>
        <div className='contact-info'>
          <EmailIcon className='contact-info-icon' />
          <h3>Correo Electrónico</h3>
          <p>info@intercambiopropiedades.com</p>
        </div>
        <div className='contact-info'>
          <PhoneIcon className='contact-info-icon' />
          <h3>Número de Teléfono</h3>
          <p>(+506) 8313-3713</p>
        </div>
        <div className='contact-info'>
          <LocationOnIcon className='contact-info-icon' />
          <h3>Dirección</h3>
          <p>San José, Costa Rica.</p>
        </div>
      </div>
      <div className='feedback-form-container'>
        <h2>Deja tu Feedback</h2>
        <div className='star-rating'>
          <p>Calificación:</p>
          {renderStars()}
        </div>
        <FormControl fullWidth>
          <InputLabel htmlFor='feedback-comment'>Comentario</InputLabel>
          <Input
            id='feedback-comment'
            multiline
            rows={4}
            className='comment-input'
            value={feedbackData.comment}
            onChange={handleInputChange('comment')}
          />
        </FormControl>
        <div className='btn-feedback'>
          <Button buttonStyle='btn--outline' onClick={handleFeedbackSubmit}>
            Enviar Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
