
import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div>
      {/* Lógica para mostrar la información de la propiedad */}
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <img src={property.image} alt={property.title} />
    </div>
  );
};

export default PropertyCard;
