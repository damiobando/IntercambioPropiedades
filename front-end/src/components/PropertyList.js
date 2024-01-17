import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard'; 
import Pagination from './Pagination'; 
import './PropertyList.css'

const PropertyList = () => {
  // Estado para manejar la lista de propiedades
  const [properties, setProperties] = useState([]);
  // Estado para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para manejar el número de propiedades por página
  const [propertiesPerPage] = useState(10); // Puedes ajustar este número según tus necesidades

  // Lógica para obtener las propiedades, por ejemplo, usando una API
  useEffect(() => {
    // Lógica para obtener las propiedades (puedes usar fetch o axios)
    // y actualizar el estado de las propiedades
    // Ejemplo: fetchProperties().then(data => setProperties(data));
  }, []); // Se ejecuta solo al montar el componente

  // Lógica para la paginación
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Search Bar (puedes implementar un componente separado si es necesario) */}
      <input type="text" placeholder="Buscar propiedades" />

      {/* Lista de propiedades */}
      {currentProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}

      {/* Paginación */}
      <Pagination
        propertiesPerPage={propertiesPerPage}
        totalProperties={properties.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default PropertyList;
