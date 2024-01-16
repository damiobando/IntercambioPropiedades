import React, { useState } from 'react';
import './PreferencesPage.css';

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
    // Aquí puedes enviar las preferencias al servidor o realizar alguna acción con ellas
    console.log('Preferencias enviadas:', { propertyType, financingType });
  };

  return (
    <div className='main-container'>
        <div className='preference-container'>
            <h1>Preferencias del Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Tipo de Propiedad:</label>
                <select value={propertyType} onChange={handlePropertyTypeChange}>
                    <option value="">Selecciona...</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    {/* Agrega más opciones según sea necesario */}
                </select>
                </div>
                <div>
                <label>Tipo de Financiamiento:</label>
                <select value={financingType} onChange={handleFinancingTypeChange}>
                    <option value="">Selecciona...</option>
                    <option value="contado">Contado</option>
                    <option value="financiamiento">Financiamiento</option>
                    {/* Agrega más opciones según sea necesario */}
                </select>
                </div>
                <button type="submit">Guardar Preferencias</button>
            </form>
        </div>

    </div>
  );
};

export default PreferencesPage;
