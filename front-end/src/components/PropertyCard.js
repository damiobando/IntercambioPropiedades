// PropertyCard.js
import React, { useState, useEffect } from 'react';
import './PropertyCard.css'; // Archivo de estilos específico para PropertyCard
import { Link } from 'react-router-dom';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

  const sliderStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  };

  return (
    <img
      src={images[currentImageIndex]}
      alt={`Image ${currentImageIndex + 1}`}
      style={sliderStyle}
    />
  );
};

const PropertyCard = ({ property, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Implementa la lógica para agregar/quitar la propiedad de favoritos en tu aplicación
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-card-container" style={{ backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}>
      

      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Precio: {property.price}</p>
      <ImageSlider images={property.images} />
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
