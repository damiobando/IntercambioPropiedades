// PropertyList.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import './PropertyList.css';
import { getProperties } from '../api/property';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleButtonClick = (propertyId) => {
    // Redirige a la página de detalles con el ID de la propiedad
  };

  return (
    <div className='property-list-container'>
      <div className='search-bar'>
        <input type="text" placeholder="Buscar propiedades" />
      </div>

      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="property-box">
              <div className="property-background">
                {/* Pasa el ID de la propiedad directamente */}
                <PropertyCard property={property} onClickButton={(propertyId) => handleButtonClick(propertyId)} />
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
