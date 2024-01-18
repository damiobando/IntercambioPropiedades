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
  const [offers, setOffers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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

 const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    // Al cancelar, restaura los valores originales y desactiva la edición
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditing(false);
  };

  const handleAcceptClick = () => {
    // Puedes realizar acciones de actualización aquí, por ejemplo, enviar al servidor
    // ...
    // Después de realizar la actualización, desactiva la edición
    setIsEditing(false);
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

  const handleAcceptOffer = (offer) => {
    // Lógica para aceptar la oferta
    console.log('Oferta aceptada:', offer);
    // Puedes realizar una llamada al backend para actualizar el estado de la oferta, por ejemplo:
    // updateOfferStatus(offer._id, 'accepted');
  };

  const handleRejectOffer = (offer) => {
    // Lógica para rechazar la oferta
    console.log('Oferta rechazada:', offer);
    // Puedes realizar una llamada al backend para actualizar el estado de la oferta, por ejemplo:
    // updateOfferStatus(offer._id, 'rejected');
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
        <button onClick={() => handleButtonClick('misOfertas')} className={activeButton === 'misOfertas' ? 'active' : ''}>
          Mis Ofertas
        </button>
        {/* Agrega más botones según sea necesario */}
      </div>

      <div className="info-container">
      {activeButton === 'miInformacion' && (
          <div>
            <h2>Mi Información</h2>
            {/* Mostrar campos en modo de edición */}
            {isEditing ? (
              <form onSubmit={handleAcceptClick}>
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    type="tel"
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                {/* Agrega más campos según sea necesario */}
                <div>
                  <button type="button" onClick={handleCancelClick}>
                    Cancelar
                  </button>
                  <button type="submit">Aceptar</button>
                </div>
              </form>
            ) : (
              // Mostrar campos en modo de visualización
              <div>
                <p>Nombre: {userInfo.name}</p>
                <p>Correo Electrónico: {userInfo.email}</p>
                <p>Teléfono: {userInfo.phone}</p>
                {/* Agrega más campos según sea necesario */}
                <button type="button" onClick={handleUpdateClick}>
                  Actualizar
                </button>
              </div>
            )}
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
                  <div className='favoritos-container'> 
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
                  </div>
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
        {activeButton === 'misOfertas' && (
          <div>
            <h2>Mis Ofertas</h2>
            {offers.length > 0 ? (
              <ul>
                {offers.map((offer) => (
                  <li key={offer._id} style={{ marginBottom: '20px ' }}>
                    {/* Muestra la información de la oferta */}
                    <p><strong>Fecha de la Oferta:</strong> {offer.date}</p>
                    {/* Agrega más detalles de la oferta según sea necesario */}
                    <hr />
                    <button
                      type="button"
                      onClick={() => handleAcceptOffer(offer)}
                      className="small-delete"
                    >
                      Aceptar Oferta
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRejectOffer(offer)}
                      className="small-delete"
                    >
                      Rechazar Oferta
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay ofertas disponibles.</p>
            )}
          </div>
        )}
        {/* Agrega más contenido según sea necesario */}
      </div>
    </div>
  );
}

export default Account;
