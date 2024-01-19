import React, { useState, useEffect } from 'react';
import './Account.css';
import { findUserByToken } from '../api/users';
import { getSearchHistory, deleteHistory } from '../api/history';
import { getFavorites,deleteFavorite } from '../api/favorites';
import { changePassword } from '../api/users';
import { getOffers } from '../api/offers';
import { rejectOffer } from '../api/offers';
import { updateUser } from '../api/users';

function AdminAccount() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [messages, setMessages] = useState([]); // Agregado: estado para mensajes
  const [properties, setProperties] = useState([]); // Agregado: estado para propiedades
  const [reports, setReports] = useState([]); // Nuevo estado para los reportes

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
        const messagesResponse = await messages(user.data._id); // Llama al API para obtener los mensajes
        setMessages(messagesResponse.data);
        const userProperties = await properties(user.data._id); // Llama al API para obtener las propiedades del usuario

        // console.log('User Properties:', userProperties); 
        // setProperties(userProperties.data);
        // Obtener los reportes
        // const reportsResponse = await getReports(); // Ajusta según tu API
        // setReports(reportsResponse.data);

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
      console.log('Updated user info:', userInfo);
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
      console.log(`Deleted item with ID: ${item._id}`);
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
        // Agregado: Lógica para eliminar propiedades
        // Asegúrate de tener una función en tu API que elimine propiedades por ID
        // y actualiza la lógica según sea necesario
        // await deleteProperty(item._id);
        // const updatedProperties = properties.filter((property) => property._id !== item._id);
        // setProperties(updatedProperties);
        setConfirmDelete(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    // Agregado: Lógica para confirmar la eliminación de propiedades
    // Asegúrate de tener una función en tu API que elimine propiedades por ID
    // y actualiza la lógica según sea necesario
    // await deleteProperty(item._id);
    // const updatedProperties = properties.filter((property) => property._id !== item._id);
    // setProperties(updatedProperties);
    setConfirmDelete(false);
    alert('Propiedad eliminada exitosamente');
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

  const handleAcceptReport = async (reportId) => {
    try {
      // Lógica para aceptar el reporte (puedes llamar a una función en tu API)
      // await acceptReport(reportId); // Ajusta según tu API

      // Actualiza el estado para reflejar el reporte aceptado
      const updatedReports = reports.filter((report) => report._id !== reportId);
      setReports(updatedReports);

      alert('Reporte aceptado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al aceptar el reporte');
    }
  };



  return (
    <div> <h1>Cuenta de Administrador</h1>
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
        <button onClick={() => handleButtonClick('todasLasPropiedades')} className={activeButton === 'todasLasPropiedades' ? 'active' : ''}>
          Todas las Propiedades
        </button>
        <button onClick={() => handleButtonClick('reportes')} className={activeButton === 'reportes' ? 'active' : ''}>
          Reportes
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
                {messages.map((message) => (
                  <li key={message._id} style={{ marginBottom: '20px' }}>
                    <p><strong>Usuario:</strong> {message.user}</p>
                    <p><strong>Detalle del Mensaje:</strong> {message.messageDetail}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay mensajes disponibles.</p>
            )}
          </div>
        )}
        {activeButton === 'todasLasPropiedades' && (
        <div>
          <h2>Todas las Propiedades</h2>
          {/* Agrega una lógica similar a la sección de 'misPropiedades' para mostrar todas las propiedades */}
          {properties.length > 0 ? (
            <ul>
              {properties.map((property) => (
                <div className='favoritos-container' key={property._id}>
                  <li style={{ marginBottom: '20px' }}>
                    {/* ... (muestra la información de la propiedad) */}
                    <hr />
                    {/* ... (botón para eliminar publicación) */}
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
          {activeButton === 'reportes' && (
        <div>
          <h2>Reportes</h2>
          {reports.length > 0 ? (
            <ul>
              {reports.map((report) => (
                <li key={report._id} style={{ marginBottom: '20px' }}>
                  <p><strong>Usuario que hizo el reporte:</strong> {report.userName}</p>
                  <p><strong>Propiedad Reportada:</strong> {report.propertyTitle}</p>
                  <p><strong>Descripción del Reporte:</strong> {report.description}</p>
                  <button
                    type="button"
                    onClick={() => handleAcceptReport(report._id)}
                  >
                    Aceptar Reporte
                  </button>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay reportes disponibles.</p>
          )}
        </div>
      )}
          
        {/* Agrega más contenido según sea necesario */}
      </div>
    </div>
    </div>
  );
}

export default AdminAccount;
