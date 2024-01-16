import React, { useState } from 'react';
import './PreferencesPage.css';
import { addPreference } from '../api/preference';
const PreferencesPage = () => {
  const [propertyType, setPropertyType] = useState('');
  const [financingType, setFinancingType] = useState('');

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleFinancingTypeChange = (event) => {
    setFinancingType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const preferenceData = { propertyType:propertyType, financingType:financingType };
    const res = addPreference(preferenceData);
    console.log(res);
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
          <button type='submit' className='submit-button'>
            Guardar Preferencias
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesPage;
