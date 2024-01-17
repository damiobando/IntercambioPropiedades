import React from 'react';
import './PopupMessage.css'; // Archivo de estilos específico para PopupMessage

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PopupMessage;
