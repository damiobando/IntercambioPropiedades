import React, { useState } from 'react';
import './Account.css';

function Account() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Limpia los campos después de cambiar la contraseña
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="main-background">
      <div className="left-bar">
        <button onClick={() => handleButtonClick('miInformacion')} className={activeButton === 'miInformacion' ? 'active' : ''}>
          Mi Información
        </button>
        <button onClick={() => handleButtonClick('historialBusqueda')} className={activeButton === 'historialBusqueda' ? 'active' : ''}>
          Historial de Búsqueda
        </button>
        <button onClick={() => handleButtonClick('favoritos')} className={activeButton === 'favoritos' ? 'active' : ''}>
          Favoritos
        </button>
        <button onClick={() => handleButtonClick('cambiarContrasena')} className={activeButton === 'cambiarContrasena' ? 'active' : ''}>
          Cambiar Contraseña
        </button>
        {/* Agrega más botones según sea necesario */}
      </div>

      <div className="info-container">
        {activeButton === 'miInformacion' && (
          <div>
            <h2>Mi Información</h2>
            {/* información del usuario */}
            <p>Nombre: John Doe</p>
            <p>Correo Electrónico: john.doe@example.com</p>
            {/*  más información */}
          </div>
        )}
        {activeButton === 'historialBusqueda' && (
          <div>
            <h2>Historial de Búsqueda</h2>
            {/* historial de búsqueda */}
            <ul>
              <li>Elemento 1</li>
              <li>Elemento 2</li>
              {/*  más elementos según sea necesario */}
            </ul>
          </div>
        )}
        {activeButton === 'favoritos' && (
          <div>
            <h2>Favoritos</h2>
            {/* lista de elementos favoritos */}
            <ul>
              <li>Favorito 1</li>
              <li>Favorito 2</li>
            </ul>
          </div>
        )}
        {activeButton === 'cambiarContrasena' && (
          <div>
            <form onSubmit={handleSubmit}>
              <h2>Cambiar Contraseña</h2>
              <div>
                <label htmlFor="currentPassword">Contraseña Actual:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Cambiar Contraseña</button>
            </form>
          </div>
        )}
        {/* Agrega más contenido según sea necesario */}
      </div>
    </div>
  );
}

export default Account;
