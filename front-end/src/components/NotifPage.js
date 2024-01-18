import React, { useState, useEffect } from 'react';
import './NotifPage.css';
import { findUserByToken } from '../api/users';
import { getNotifications, markNotificationAsRead, deleteNotification } from '../api/notification';

const NotifPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const user = await findUserByToken(token);
        const res = await getNotifications(user.data._id);
        setNotifications(res.data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchData();
  }, []);

  const markAsRead = async (notification) => {
    try {
        await markNotificationAsRead(notification._id);

        setNotifications((prevNotifications) =>
            prevNotifications.map((prevNotification) =>
                prevNotification._id === notification._id
                    ? { ...prevNotification, read: true }
                    : prevNotification
            )
        );
    } catch (error) {
        console.error('Error al marcar la notificación como leída:', error);
    }
};
  const deleteNotificationHandler = async (notification) => {
    try {
        await deleteNotification(notification._id);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((prevNotification) => prevNotification._id !== notification._id)
        );
    } catch (error) {
        console.error('Error al borrar la notificación:', error);
    }
  };
  return (
    <div className='main'>
      <h1>Notificaciones</h1>
      {notifications.length === 0 ? (
        <p className="no-notifications-message">No hay notificaciones para mostrar.</p>
      ) : (
        notifications.map((notification) => (
          <div className={`notification-container ${notification.read ? 'read' : ''}`} key={notification.id}>
            <div className='user-icon'></div>
            <div className='notification-content'>
              <p className='message'>{notification.content}</p>
            </div>
            <div className='action-buttons'>
              <button
                className={`action-button mark-as-read ${notification.read ? 'read' : ''}`}
                onClick={() => markAsRead(notification)}
                disabled={notification.read}
              >
                {notification.read ? 'Leído' : 'Marcar como leído'}
              </button>
              <button className='action-button delete' onClick={() => deleteNotificationHandler(notification)}>
                Borrar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotifPage;
