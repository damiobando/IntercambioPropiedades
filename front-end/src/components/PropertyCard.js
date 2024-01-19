import React, { useState, useEffect } from 'react';
import './PropertyCard.css';
import { Link } from 'react-router-dom';
import { addFavorite } from '../api/favorites';
import PopupMessage from './PopupMessage';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-slider">
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />
    </div>
  );
};

const PropertyCard = ({ property, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    return cookies.token || null;
  };

  const handleFavoriteClick = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        console.error('No se pudo encontrar el token en las cookies.');
        return;
      }

      if (!property || !property._id) {
        console.error('La propiedad o el ID de la propiedad son indefinidos.');
        return;
      }

      const favoriteData = { user_id: token, property_id: property._id };
      await addFavorite(favoriteData);

      // La propiedad se agregó exitosamente
      setIsFavorite(true);
      setPopupMessage('Esta propiedad se ha agregado a favoritos');
      setShowPopup(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setPopupMessage('Esta propiedad ya se encuentra en favoritos');
      } else {
        console.error('Error al manejar favoritos:', error);
        setPopupMessage('Hubo un error al procesar la solicitud');
      }

      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // Si la propiedad ya está en favoritos, puedes ajustar el estado según sea necesario
    if (!isFavorite && popupMessage === 'Esta propiedad se ha agregado a favoritos') {
      setIsFavorite(true);
    }
  };

  return (
    <div className="property-card-container">
      <ImageSlider images={property.images} />

      <div className="property-info">
        <h2>{property.title}</h2>
        <p>{property.description}</p>
        <p> <strong>Precio: $  {property.price} </strong></p>
        <Link to={`/propertyInfo/${property._id}`}>
          <button className="details-button">Ver Detalles</button>
        </Link>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          Agregar a Favoritos
        </button>
      </div>

      {showPopup && (
        <PopupMessage message={popupMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default PropertyCard;
