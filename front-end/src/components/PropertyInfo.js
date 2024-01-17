// PropertyInfo.js

import React, { useState, useEffect } from 'react';
import './PropertyInfo.css';
import MessageToSeller from './MessageToSeller';
import ReportPublication from './ReportPublication';

const PropertyInfo = () => {
  const [propertyData, setPropertyData] = useState({});
  const [sellerData, setSellerData] = useState({});

  useEffect(() => {
    fetch('/api/property-info') // Reemplaza con la ruta correcta
      .then((response) => response.json())
      .then((data) => {
        setPropertyData(data.property);
        setSellerData(data.seller);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="property-info-page">
      <div className="property-info">
        <h1>{propertyData.title}</h1>
        {/* Agrega más información de la propiedad según tu modelo de datos */}
        <div>
          <p>Fotos: {propertyData.photos}</p>
          <p>Ubicación: {propertyData.location}</p>
          <p>Precio: {propertyData.price}</p>
          {/* Agrega más campos según sea necesario */}
        </div>
      </div>
      <div className="side-container">
        <div className="seller-info-container">
          <h2>Información del Vendedor</h2>
          <p>Nombre: {sellerData.name}</p>
          <p>Contacto: {sellerData.contact}</p>
          {/* Agrega más información del vendedor según tu modelo de datos */}
        </div>
        <MessageToSeller />
        <ReportPublication />
      </div>
    </div>
  );
};

export default PropertyInfo;
