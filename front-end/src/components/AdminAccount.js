import React, { useState, useEffect } from 'react';
import './Account.css';
import { findUserByToken, updateUser } from '../api/users';
import { getAllProperties,deleteProperty } from '../api/property';
import { getAllReports } from '../api/report';
import { getAllFeedback } from '../api/feedback'
import { deleteReport } from '../api/report';

function AdminAccount() {
  const [activeButton, setActiveButton] = useState('miInformacion');
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [properties, setProperties] = useState([]);
  const [property, setNewProperty] = useState('');
  const [reports, setReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserByToken(token);

        // Verificar si el usuario es un administrador
        if (!user.data.isAdmin) {
          // Mostrar un mensaje y retornar para evitar el resto de la lógica
          alert('Usted no es un administrador.');
          return;
        }

        setUserInfo(user.data);
        const userProperties = await getAllProperties();
        setProperties(userProperties.data);
        const reportsResponse = await getAllReports();
        setReports(reportsResponse.data);
        const feedbacksResponse = await getAllFeedback();
        setFeedbacks(feedbacksResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleAcceptClick = async () => {
    try {
      console.log('Updated user info:', userInfo);
      await updateUser(userInfo._id, userInfo);
      alert('Información actualizada exitosamente');
      setIsEditing(false);
    } catch (error) {
      alert('Error al actualizar la información del usuario');
      console.error('Error al actualizar la información del usuario:', error);
    }
  };

  const handleDeleteItem = async (item, type) => {
    try {
        setNewProperty(item);
        setConfirmDelete(true);
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

  const handleAcceptReport = async (reportId) => {
    try {
      const res = await deleteReport(reportId);
      console.log(res);
      const updatedReports = reports.filter((report) => report._id !== reportId);
      setReports(updatedReports);
      alert('Reporte aceptado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al aceptar el reporte');
    }
  };

  return (
    <div>
      <h1>Cuenta de Administrador</h1>
      <div className="main-background">
        <div className="left-bar">
          <button onClick={() => handleButtonClick('miInformacion')} className={activeButton === 'miInformacion' ? 'active' : ''}>
            Mi Información
          </button>
          <button onClick={() => handleButtonClick('todasLasPropiedades')} className={activeButton === 'todasLasPropiedades' ? 'active' : ''}>
            Todas las Propiedades
          </button>
          <button onClick={() => handleButtonClick('reportes')} className={activeButton === 'reportes' ? 'active' : ''}>
            Reportes
          </button>
          <button onClick={() => handleButtonClick('verFeedbacks')} className={activeButton === 'verFeedbacks' ? 'active' : ''}>
            Ver Feedbacks
          </button>
        </div>

        <div className="info-container">
          {activeButton === 'miInformacion' && (
            <div>
              <h2>Mi Información</h2>
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
                  <div>
                    <button type="button" onClick={handleCancelClick}>
                      Cancelar
                    </button>
                    <button type="submit">Aceptar</button>
                  </div>
                </form>
              ) : (
                <div>
                  <p>Nombre: {userInfo.name}</p>
                  <p>Correo Electrónico: {userInfo.email}</p>
                  <p>Teléfono: {userInfo.phone}</p>
                  <button type="button" onClick={handleUpdateClick}>
                    Actualizar
                  </button>
                </div>
              )}
            </div>
          )}
          {activeButton === 'todasLasPropiedades' && (
            <div>
              <h2>Todas las Propiedades</h2>
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
            <button onClick={handleConfirmDelete()}>Sí</button>
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
                      <p><strong>Usuario que hizo el reporte:</strong> {report.reporter}</p>
                      <p><strong>Propiedad Reportada:</strong> {report.propertyName}</p>
                      <p><strong>ID de la propiedad Reportada:</strong> {report.reported_id}</p>
                      <p><strong>Descripción del Reporte:</strong> {report.description}</p>
                      <p><strong>Fecha del Reporte:</strong> {report.date}</p>
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
          {activeButton === 'verFeedbacks' && (
            <div>
              <h2>Ver Feedbacks</h2>
              {feedbacks.length > 0 ? (
                <ul>
                  {feedbacks.map((feedback) => (
                    <li key={feedback._id} style={{ marginBottom: '20px' }}>
                      <p><strong>Usuario:</strong> {feedback.userName}</p>
                      <p><strong>Calificación:</strong> {feedback.rating}</p>
                      <p><strong>Mensaje:</strong> {feedback.comment}</p>
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay feedbacks disponibles.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
