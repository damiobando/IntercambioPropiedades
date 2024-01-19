import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from './Button';
import './Feedback.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { findUserByToken } from '../api/users';
import { createFeedback } from '../api/feedback';

function Feedback() {
  const navigate = useNavigate()
  const [feedbackData, setFeedbackData] = useState({});

  const handleInputChange = (field) => (event) => {
    setFeedbackData({ ...feedbackData, [field]: event.target.value });
  };

  const handleStarClick = (rating) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    const token = document.cookie.split('; ').find((row) => row.startsWith('token=')).split('=')[1];
    const user = await findUserByToken(token);
    const sendInfo = {
      user_id: user.data._id,
      userName: user.data.name,
      comment: feedbackData.comment,
      rating: feedbackData.rating,
    };

    const res = await createFeedback(sendInfo);
    console.log(res);
    alert('Feedback enviado exitosamente');
    navigate('/contact-us');
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
