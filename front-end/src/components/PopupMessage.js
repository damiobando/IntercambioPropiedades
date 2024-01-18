import React, { useEffect, useState } from 'react';
import './PopupMessage.css'; // Archivo de estilos específico para PopupMessage

const PopupMessage = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Configurar un temporizador para cerrar el popup después de 3000 milisegundos (3 segundos)
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose(); // Llamar a la función onClose para realizar acciones adicionales si es necesario
    }, 1500);

    // Limpiar el temporizador al desmontar el componente o cuando el popup se cierre manualmente
    return () => clearTimeout(timer);
  }, [onClose]);

  // Renderizar el componente solo si está abierto

  return (
    <>
    {isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <p>{message}</p>
          {/* <button onClick={() => { setIsOpen(false); onClose(); }}>Cerrar</button> */}
        </div>
      </div>
    )}
  </>
  );
};

export default PopupMessage;
