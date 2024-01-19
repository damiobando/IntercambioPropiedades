// GenerateOffer.js

import React from 'react';
import './GenerateOffer.css';

function GenerateOffer() {
  return (
    <div >
        <h1>Generar una oferta por una propiedad </h1>
    <div className='container'>
      {/* Contenedor del vendedor */}
      <div className='container-seller'>
        <h2>Oferta del Vendedor</h2>
        <div>
          <label>Nombre del Vendedor:</label>
          <input type='text' value='Nombre del Vendedor' readOnly />
        </div>
        <div>
          <label>Título de Propiedad:</label>
          <input type='text' value='Título de Propiedad' readOnly />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type='text' value='Ubicación' readOnly />
        </div>
        <div>
          <label>Precio:</label>
          <input type='text' value='Precio' readOnly />
        </div>
        <div>
          <label>Métodos de Pago:</label>
          <input type='text' value='Métodos de Pago' readOnly />
        </div>
        <div>
          <label>Financiamiento:</label>
          <input type='text' value='Sí' readOnly />
        </div>
      </div>

      {/* Contenedor del comprador */}
      <div className='container-buyer'>
        <h2>Generar Oferta</h2>
        <div>
          <label>Método de Pago:</label>
          <input type='text' placeholder='Ingrese el método de pago' />
        </div>
        <div>
          <label>Precio Ofrecido:</label>
          <input type='text' placeholder='Ingrese el precio ofrecido' />
        </div>
        <button>Generar Oferta</button>
      </div>
    </div>
    </div>
  );
}

export default GenerateOffer;
