import React, { useState, useEffect } from 'react';
import './Account.css';
import { getSearchHistory, deleteHistory } from '../api/history';
import { getFavorites,deleteFavorite } from '../api/favorites';
import {findUserByToken, changePassword, updateUser } from '../api/users';
import {getOffers, rejectOffer} from '../api/offers';
import {getMessages} from '../api/message';
import {getUserProperties, deleteProperty} from '../api/property';

function Account() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [property, setNewProperty] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [messages, setMessages] = useState([]); // Agregado: estado para mensajes
  const [properties, setProperties] = useState([]); // Agregado: estado para propiedades

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
        const offersResponse = await getOffers(user.data._id); // Llama al API para obtener las ofertas
        setOffers(offersResponse.data.offers);
        const messagesResponse = await getMessages(user.data._id); // Llama al API para obtener los mensajes
        setMessages(messagesResponse.data);
        const userProperties = await getUserProperties(user.data._id); // Llama al API para obtener las propiedades del usuario
        console.log('User Properties:', userProperties); 
        setProperties(userProperties.data);
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

  const handleAcceptClick = async () => {
    try {
      const updatedUser = await updateUser(userInfo._id, userInfo);
      alert('Información actualizada exitosamente'); 
      setIsEditing(false);
    } catch (error) {
      alert('Error al actualizar la información del usuario');
      console.error('Error al actualizar la información del usuario:', error);
      // Puedes manejar el error de manera adecuada, como mostrar un mensaje al usuario
    }

  };

  const handleDeleteItem = async (item, type) => {
    try {
      if (type === 'history') {
        await deleteHistory(item._id);
        const updatedHistory = searchHistory.filter((historyItem) => historyItem._id !== item._id);
        setSearchHistory(updatedHistory);
        alert('Elemento eliminado exitosamente');
      } else if (type === 'favorites') {
        await deleteFavorite(item._id);
        const updatedFavorites = favorites.filter((fav) => fav._id !== item._id);
        setFavorites(updatedFavorites);
        alert('Favorito eliminado exitosamente');
      } else if (type === 'property') {
        setNewProperty(item);
        setConfirmDelete(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    const item = property;
    try {
      if (!item._id) {
        console.error('Invalid _id:', item._id);
        return;
      }
  
      const propertyID = item._id;
  
      await deleteProperty(propertyID);
  
      setConfirmDelete(false);

      alert('Propiedad eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting property:', error);
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

  const handleRejectOffer = async (offer) => {
    try {
      console.log('Rejected offer with ID:', offer.offerId);
      await rejectOffer(offer.offerId); // Reemplaza 'rejectOffer' con la función que elimina la oferta en tu API
      const updatedOffers = offers.filter((o) => o.offerId !== offer.offerId);
      console.log('Updated Offers:', updatedOffers);
      setOffers(updatedOffers);
      alert('Oferta rechazada exitosamente');
    } catch (error) {
      console.error(error);
    }
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
        <button onClick={() => handleButtonClick('misMensajes')} className={activeButton === 'misMensajes' ? 'active' : ''}>
          Mis Mensajes
        </button>
        <button onClick={() => handleButtonClick('misPropiedades')} className={activeButton === 'misPropiedades' ? 'active' : ''}>
          Mis Propiedades
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
                <div className='favoritos-container' key={item._id}>
                  <li style={{ marginBottom: '20px ' }}>
                    <p><strong>Titulo:</strong> {item.title}</p>
                    <p><strong>Descripción:</strong> {item.description}</p>
                    <p><strong>Precio:</strong> {item.price}</p>
                    <p><strong>Provincia:</strong> {item.province}</p>
                    <p><strong>Cantón:</strong> {item.canton}</p>
                    <p><strong>Distrito:</strong> {item.distrito}</p>
                    <hr />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item, 'favorites')} // Change 'history' to 'favorites'
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
                  {offers.map((offer, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                      {/* Muestra la información de la oferta */}
                      <p><strong>Ofertante:</strong> {offer.offerorName}</p>
                      <p><strong>Correo Electrónico:</strong> {offer.offerorEmail}</p>
                      <p><strong>Título de la Propiedad:</strong> {offer.propertyTitle}</p>
                      <p><strong>Monto Ofrecido:</strong> {offer.offeredAmount}</p>
                      {/* Agrega más detalles de la oferta según sea necesario */}
                      <hr />
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
          {activeButton === 'misMensajes' && (
          <div>
            <h2>Mis Mensajes</h2>
            {messages.length > 0 ? (
              <ul>
                {messages.map((message,index) => (
                  <li key={index} style={{ marginBottom: '20px' }}>
                    <p><strong>Usuario:</strong> {message.sender_name}</p>
                    <p><strong>Detalle del Mensaje:</strong> {message.content}</p>
                    <p><strong>Contacto:</strong> {message.contact}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay mensajes disponibles.</p>
            )}
          </div>
        )}
        {activeButton === 'misPropiedades' && (
          <div>
            <h2>Mis Propiedades</h2>
            {properties.length > 0 ? (
              <ul>
                {properties.map((property) => (
                  <div className='favoritos-container' key={property._id}>
                    <li style={{ marginBottom: '20px' }}>
                      <p><strong>Titulo:</strong> {property.title}</p>
                      <p><strong>Descripción:</strong> {property.description}</p>
                      <p><strong>Precio:</strong> {property.price}</p>
                      <p><strong>Provincia:</strong> {property.province}</p>
                      <p><strong>Cantón:</strong> {property.canton}</p>
                      <p><strong>Distrito:</strong> {property.distrito}</p>
                      <hr />
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(property, 'property')}
                        className="small-delete"
                      >
                        Eliminar Publicación
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No hay propiedades disponibles.</p>
            )}
          </div>
        )}
        {confirmDelete && (
          <div className="delete-confirmation">
            <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
            <button onClick={handleConfirmDelete}>Sí</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        )}
          
      </div>
    </div>
  );
}

export default Account;
