import React, { useState } from 'react';
import './Account.css';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  // Agrega más información según sea necesario
};

function Account() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['Elemento 1', 'Elemento 2']); // Ejemplo de historial de búsqueda
  const [favorites, setFavorites] = useState(['Favorito 1', 'Favorito 2']); // Ejemplo de lista de favoritos

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChangesClick = () => {
    // Aquí puedes realizar alguna acción con la información actualizada,
    // como enviarla al servidor. En este ejemplo, simplemente cambiamos al modo de visualización.
    setIsEditMode(false);
  };

  const handleDeleteItem = (index, type) => {
    if (type === 'history') {
      const updatedHistory = [...searchHistory];
      updatedHistory.splice(index, 1);
      setSearchHistory(updatedHistory);
    } else if (type === 'favorites') {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  const handleDeleteAll = (type) => {
    if (type === 'history') {
      setSearchHistory([]);
    } else if (type === 'favorites') {
      setFavorites([]);
    }
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
            {isEditMode ? (
              <form>
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" value={userData.name} disabled={!isEditMode} />
                </div>
                <div>
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input type="text" id="email" value={userData.email} disabled={!isEditMode} />
                </div>
                {/* Agrega más campos según sea necesario */}
                {!isEditMode ? (
                  <button type="button" onClick={handleEditClick}>
                    Editar
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={handleSaveChangesClick}>
                      Guardar Cambios
                    </button>
                    <button type="button" onClick={() => setIsEditMode(false)}>
                      Cancelar
                    </button>
                  </>
                )}
              </form>
            ) : (
              <div>
                <p>Nombre: {userData.name}</p>
                <p>Correo Electrónico: {userData.email}</p>
                {/* Mostrar más información según sea necesario */}
                <button type="button" onClick={handleEditClick}>
                  Editar
                </button>
              </div>
            )}
          </div>
        )}
        {activeButton === 'historialBusqueda' && (
          <div >
            <h2>Historial de Búsqueda</h2>
            {/* historial de búsqueda */}
            <ul>
              {searchHistory.map((item, index) => (
                <li key={index}>
                  {item}
                  <button type="button" onClick={() => handleDeleteItem(index, 'history')} className="small-delete">
                  Borrar
                </button>
                </li>
              ))}
            </ul>
            {searchHistory.length > 0 && (
              <button type="button" onClick={() => handleDeleteAll('history')}>
                Borrar Todo
              </button>
            )}
          </div>
        )}
        {activeButton === 'favoritos' && (
          <div >
            <h2>Favoritos</h2>
            {/* lista de elementos favoritos */}
            <ul>
              {favorites.map((item, index) => (
                <li key={index}>
                  {item}
                  <button type="button" onClick={() => handleDeleteItem(index, 'history')} className="small-delete">
                  Borrar
                </button>
                </li>
              ))}
            </ul>
            {favorites.length > 0 && (
              <button type="button" onClick={() => handleDeleteAll('favorites')}>
                Borrar Todo
              </button>
            )}
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
