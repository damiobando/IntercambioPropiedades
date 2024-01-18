import React, { useState } from 'react';
import './PreferencesPage.css';
import { addPreference } from '../api/preference';
import PopupMessage from './PopupMessage';
import { useNavigate } from 'react-router-dom';
import { findUserByToken } from '../api/users';
const PreferencesPage = () => {
  const [propertyType, setPropertyType] = useState('');
  const [financingType, setFinancingType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleFinancingTypeChange = (event) => {
    setFinancingType(event.target.value);
  };

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    return cookies.token || null;
  };
  
  const closePopup = () => {
    setShowPopup(false);

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getTokenFromCookie();
    const user = await findUserByToken(token);
    console.log(user);
    const preferenceData = { user_id: user.data._id, propertyType:propertyType, financingType:financingType };
    const res = addPreference(preferenceData);
    console.log(res);
  };

  

  const handleSavePreferencesClick = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        console.error('No se pudo encontrar el token en las cookies.');
        return;
      }

      // Verificar que se hayan seleccionado ambas opciones
      if (!propertyType || !financingType) {
        console.error('Por favor, selecciona ambos tipos de preferencias.');
        setPopupMessage('Por favor, selecciona ambos tipos de preferencias.');
        setShowPopup(true);
        return;
      }

      // Lógica para guardar preferencias aquí...

      // Éxito al guardar preferencias
      setPopupMessage('Preferencias guardadas exitosamente');
      setShowPopup(true);

      // Redirigir a la página principal después de un breve retraso (por ejemplo, 2 segundos)
      setTimeout(() => {
        navigate('/listings');
      }, 2000); // Ajusta el tiempo según tus necesidades
    } catch (error) {
      console.error('Error al manejar la acción de guardar preferencias:', error);
      setPopupMessage('Hubo un error al procesar la solicitud');
      setShowPopup(true);
    }
  };
  

  return (
    <div className='main-container'>
      <h1 className='page-title'>
        Para nosotros es importante saber tus preferencias para darte el mejor servicio
      </h1>
      <div className='preference-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Tipo de Propiedad:</label>
            <select value={propertyType} onChange={handlePropertyTypeChange}>
              <option value=''>Selecciona...</option>
              <option value='casa'>Casa</option>
              <option value='apartamento'>Apartamento</option>
              <option value='terreno'>Terreno</option> 
            </select>
          </div>
          <div className='form-group'>
            <label>Tipo de Financiamiento:</label>
            <select value={financingType} onChange={handleFinancingTypeChange}>
              <option value=''>Selecciona...</option>
              <option value='contado'>Contado</option>
              <option value='financiamiento'>Financiamiento</option>
            </select>
          </div>
          <button className={`favorite-button`}
          onClick={handleSavePreferencesClick}>
            Guardar Preferencias
          </button>
          {showPopup && (
        <PopupMessage message={popupMessage} onClose={closePopup} />
      )}
        </form>
      </div>
    </div>
  );
};

export default PreferencesPage;
