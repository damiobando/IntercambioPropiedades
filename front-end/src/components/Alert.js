import React, { useState, useEffect } from 'react';
import './Alert.css'; // Asegúrate de tener un archivo CSS para estilizar tu alerta

const Alert = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Ocultar la alerta después de 3 segundos

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`alert ${visible ? 'show' : 'hide'}`}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
