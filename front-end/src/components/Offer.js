import React, { useState } from 'react';
import './PropertyInfo.css';
import { findUserByToken } from '../api/users';
import { addOffer } from '../api/offers';
import { addNotification } from '../api/notification';

const Offer = ({ propertyData }) => {
  const [offeredAmount, setOfferedAmount] = useState('');
  const [offerDetail, setOfferDetail] = useState('');
  const currentDate = new Date();
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que ambos campos no estén vacíos
    if (!offeredAmount || !offerDetail) {
      console.error('Por favor, completa todos los campos.');
      return;
    }
  
    const token = document.cookie.split('; ').find((row) => row.startsWith('token=')).split('=')[1];
    const user = await findUserByToken(token);
  
    try {
      const offerData = {
        oferter: user.data.name,
        contact: user.data.email,
        owner_id: propertyData.ownerID,
        property_id: propertyData._id,
        offeredAmount: offeredAmount,
        offerDetail: offerDetail,
      };
  
      const res = await addOffer(offerData);
      console.log(res);
  
      const notificationData = {
        user_id: propertyData.ownerID,
        content: "Ha recibido una nueva oferta de la propiedad: " + propertyData.title + "",
        date: currentDate.toISOString().slice(0, 10),
        read: false,
      };
  
      const resNoti = await addNotification(notificationData);
  
      // Limpiar los campos del formulario después de una presentación exitosa
      setOfferedAmount('');
      setOfferDetail('');
  
      // Mostrar una alerta al usuario
      alert('Oferta enviada exitosamente');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="message-container">
      <h2>Realizar Oferta</h2>
      <form onSubmit={handleOfferSubmit}>
        <div>
          <label htmlFor="offeredAmount">Monto Ofrecido:</label>
          <input
            type="number"
            id="offeredAmount"
            value={offeredAmount}
            onChange={(e) => setOfferedAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="offerDetail">Detalle de la Oferta:</label>
          <textarea
            id="offerDetail"
            value={offerDetail}
            onChange={(e) => setOfferDetail(e.target.value)}
            required
          />
        </div>
        {/* Agrega más campos según sea necesario */}
        <button type="submit">Enviar Oferta</button>
      </form>
    </div>
  );
};

export default Offer;
