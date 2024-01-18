// OfferProperty.js
import React, { useState } from 'react';
import './PropertyInfo.css'

const Offer = ({ propertyId }) => {
  const [offeredAmount, setOfferedAmount] = useState('');
  const [offerDetail, setOfferDetail] = useState('');

  const handleOfferSubmit = async (e) => {
    e.preventDefault();

    // Realiza la lógica necesaria para enviar la oferta al servidor
    try {
      const offerData = {
        propertyId,
        offeredAmount,
        offerDetail,
        // Otros campos necesarios para la oferta
      };

     // const response = await makeOffer(offerData);
      //console.log(response.data); // Maneja la respuesta según tus necesidades

      // Puedes también realizar alguna acción después de enviar la oferta
    } catch (error) {
      //console.error(error);
      // Maneja el error según tus necesidades
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
