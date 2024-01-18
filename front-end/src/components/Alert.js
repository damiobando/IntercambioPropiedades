import React from 'react';

const Alert = ({ message, isSuccess, closeAlert }) => {
  const alertStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    width: '300px',
  };

  const successStyle = {
    ...alertStyle,
    backgroundColor: 'green',
  };

  const errorStyle = {
    ...alertStyle,
    backgroundColor: 'red',
  };

  // Llamar a la función closeAlert cuando se hace clic en la alerta
  const handleClick = () => {
    closeAlert();
  };

  return (
    <div style={isSuccess ? successStyle : errorStyle} onClick={handleClick}>
      {message}
    </div>
  );
};

export default Alert;
