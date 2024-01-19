import React, { useState } from 'react';
import './PropertyInfo.css';
import { findUserByToken } from '../api/users';
import { addOffer } from '../api/offers';

const Offer = ({ propertyData }) => {
  const [offeredAmount, setOfferedAmount] = useState('');
  const [offerDetail, setOfferDetail] = useState('');

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
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

      // Clear the form data after successful submission
      setOfferedAmount('');
      setOfferDetail('');

      // Show an alert to the user
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
