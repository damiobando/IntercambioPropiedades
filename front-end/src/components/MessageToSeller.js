// MessageToSeller.js

import React, { useState } from 'react';
import './PropertyInfo.css'

const MessageToSeller = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Aquí puedes implementar la lógica para enviar el mensaje al vendedor
    console.log('Mensaje enviado:', message);
    // Puedes limpiar el campo de mensaje después de enviarlo
    setMessage('');
  };

  return (
    <div className='message-container'>
      <h2>Enviar Mensaje al Vendedor</h2>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Escribe tu mensaje..."
        rows={4}
      />
      <button onClick={handleSendMessage}>Enviar Mensaje</button>
    </div>
  );
};

export default MessageToSeller;
