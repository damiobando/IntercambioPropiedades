// MessageToSeller.js
import React, { useState } from 'react';
import './PropertyInfo.css';
import { sendMessage } from '../api/message';
import { findUserByToken } from '../api/users';
import { addNotification } from '../api/notification';
const MessageToSeller = ({ sellerId }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const currentDate = new Date();
  const handleSendMessage = async () => {
   try{
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const user = await findUserByToken(token);
    const messageData = {
      receiver_id: sellerId,
      content: message,
      sender_name: user.data.name,
      contact: user.data.email,
      date: currentDate.toISOString().slice(0, 10),
    };
    console.log(messageData);
    const res = await sendMessage(messageData);
    const notificationData = {
      user_id: sellerId,
      content: "Ha recibido un mensaje de un comprador con el contenido: " + messageData.content + "",
      date: currentDate.toISOString().slice(0, 10),
      read: false,
    };
    const resNoti = await addNotification(notificationData);    
    setMessage('');
   }
   catch(res){
      console.error("Error al enviar mensaje", res);
   }
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
