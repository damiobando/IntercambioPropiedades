import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PropertyInfo.css';
import MessageToSeller from './MessageToSeller';
import ReportPublication from './ReportPublication';
import { getProperty } from '../api/property';
import { findUserById, findUserByToken } from '../api/users';
import { addHistory } from '../api/history';

const PropertyInfo = () => {
  const [propertyData, setPropertyData] = useState({});
  const [sellerData, setSellerData] = useState({});
  const propertyId = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const realID = propertyId.property_id;
        const resData = await getProperty(realID);
        setPropertyData(resData.data);
        const tempSellerData = await findUserById(resData.data.ownerID);
        setSellerData(tempSellerData.data);
  
        // Obtener la fecha actual
        const currentDate = new Date();
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserByToken(token);
        // Crear un objeto de datos para el historial
        const historyData = {
          user_id: user.data._id,
          property_id: realID,
          date: currentDate.toISOString().slice(0, 10), // Recortar para obtener solo la fecha
        };
  
        // Agregar al historial
        const resHistory = await addHistory(historyData);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageStyle = {
    maxWidth: '100%',  // Establece un ancho máximo del 100%
    maxHeight: '400px',  // Ajusta la altura máxima según tus necesidades
    margin: '0 auto',  // Centra la imagen horizontalmente
  };

  return (
    <div className="property-info-page">
      <div className="property-info">
        <h1 className="property-title">{propertyData.title}</h1>
        <Slider {...settings}>
          {propertyData.images &&
            propertyData.images.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt={`Property Photo ${index + 1}`} style={imageStyle} />
              </div>
            ))}
        </Slider>
        <div className="property-details">
          <p className="property-info-item">
            <strong>Ubicación:</strong> {propertyData.province}, {propertyData.canton}, {propertyData.distrito}
          </p>
          <p className="property-info-item">
            <strong>Precio:</strong> {propertyData.price}
          </p>
          {/* Agrega más campos según sea necesario */}
        </div>
      </div>
      <div className="side-container">
        <div className="seller-info-container">
          <h2>Información del Vendedor</h2>
          <p className="seller-info-item">
            <strong>Nombre:</strong> {sellerData.name}
          </p>
          <p className="seller-info-item">
            <strong>Contacto:</strong> {sellerData.email}
          </p>
          {/* Agrega más información del vendedor según tu modelo de datos */}
        </div>
        <MessageToSeller sellerId={sellerData._id} />
        <ReportPublication ownerID={sellerData._id} />
      </div>
    </div>
  );
};

export default PropertyInfo;
