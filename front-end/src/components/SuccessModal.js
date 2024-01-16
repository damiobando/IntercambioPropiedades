import React from 'react';

const SuccessModal = ({ onClose }) => (
  <div className='modal'>
    <div className='modal-content'>
      <p>Propiedad agregada con éxito.</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

export default SuccessModal;
