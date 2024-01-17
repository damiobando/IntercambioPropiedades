// PropertyCard.js
import React, { useState } from 'react';
import './PropertyCard.css'; // Archivo de estilos específico para PropertyCard
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Implementa la lógica para agregar/quitar la propiedad de favoritos en tu aplicación
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-card-container">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Precio: {property.price}</p>

      {/* Botón para ir a la página de detalles */}
      <Link to={`/property-details/${property._id}/${userId}`}>
        <button className="details-button">Ver Detalles</button>
      </Link>

      {/* Botón para agregar/quitar de favoritos */}
      <button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
        {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
};

export default PropertyCard;
