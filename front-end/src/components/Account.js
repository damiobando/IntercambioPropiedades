import React, { useState, useEffect } from 'react';
import './Account.css';
import { findUserByToken } from '../api/users';
import { getSearchHistory, deleteHistory } from '../api/history';
import { getFavorites,deleteFavorite } from '../api/favorites';
import { changePassword } from '../api/users';

function Account() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserByToken(token);
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
        const user = await findUserByToken(token);
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
  const handlePasswordChange = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const user = await findUserByToken(token);
  
      // Asegúrate de ajustar esto según tu lógica de manejo de contraseñas en el servidor
      const res = await changePassword({ currentPassword, newPassword, id: user.data._id });
  
      if (res.status === 200) {
        // Contraseña cambiada con éxito
        alert('Contraseña cambiada exitosamente');
  
        // Limpiar los campos de contraseña
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
          
      } else {
        alert('Error al cambiar la contraseña');
        console.error('Error al cambiar la contraseña:', res.statusText);
      }
  
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('Error al cambiar la contraseña');
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
            <form onSubmit={(e) => {
              e.preventDefault(); // Evita la recarga de la página por defecto al enviar el formulario
              handlePasswordChange(); // Llama a la función que maneja el cambio de contraseña
            }}>
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
