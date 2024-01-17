import React, { useState, useEffect } from 'react';
import './Account.css';
import { findUserById } from '../api/users';
import { getSearchHistory, deleteHistory } from '../api/history';
import { getFavorites,deleteFavorite } from '../api/favorites';

function Account() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserById(token);
        setUserInfo(user.data);
        const historyResponse = await getSearchHistory(user.data._id);
        setSearchHistory(historyResponse.data);
        const favoritesResponse = await getFavorites(user.data._id);
        setFavorites(favoritesResponse.data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  const [isEditMode, setIsEditMode] = useState(false); // Ejemplo de lista de favoritos

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

  const handleDeleteItem = async (id, type) => {
    try {
      console.log('Deleted item with ID:', id._id);
      await deleteFavorite(id._id);
      const updatedFavorites = favorites.filter((fav) => fav._id !== id._id);
      console.log('Updated Favorites:', updatedFavorites);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async (type) => {
    if (type === 'history') {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserById(token);
        await deleteHistory(user.data._id);
        const historyResponse = await getSearchHistory(user.data._id);
        setSearchHistory(historyResponse.data);
      } catch (error) {
        console.error(error);
      }
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
            {/* información del usuario */}
            <p>Nombre: {userInfo.name}</p>
            <p>Correo Electrónico: {userInfo.email}</p>
            <p>Teléfono: {userInfo.phone}</p>
            {/*  más información */}
          </div>
        )}
        {activeButton === 'historialBusqueda' && (
          <div style={{ padding: '20px ' }}>
            <h2>Historial de Búsqueda</h2>
            {searchHistory.length > 0 ? (
              <ul>
                {searchHistory.map((item) => (
                  <li key={item._id} style={{ marginBottom: '20px' }}>
                    <p><strong>Titulo:</strong> {item.title}</p>
                    <p><strong>Descripción:</strong> {item.description}</p>
                    <p><strong>Precio:</strong> {item.price}</p>
                    <p><strong>Provincia:</strong> {item.province}</p>
                    <p><strong>Cantón:</strong> {item.canton}</p>
                    <p><strong>Distrito:</strong> {item.distrito}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay elementos en el historial de búsqueda.</p>
            )}
            {searchHistory.length > 0 && (
              <button type="button" onClick={() => handleDeleteAll('history')}>
                Borrar Todo
              </button>
            )}
          </div>
        )}
        {activeButton === 'favoritos' && (
          <div>
            <h2>Favoritos</h2>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((item) => (
                  <li key={item._id} style={{ marginBottom: '20px ' }}>
                    <p><strong>Titulo:</strong> {item.title}</p>
                    <p><strong>Descripción:</strong> {item.description}</p>
                    <p><strong>Precio:</strong> {item.price}</p>
                    <p><strong>Provincia:</strong> {item.province}</p>
                    <p><strong>Cantón:</strong> {item.canton}</p>
                    <p><strong>Distrito:</strong> {item.distrito}</p>
                    <hr />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item, 'history')}
                      className="small-delete"
                    >
                      Borrar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay elementos en la lista de favoritos.</p>
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
