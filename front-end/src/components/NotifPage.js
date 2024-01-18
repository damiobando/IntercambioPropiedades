import React, { Component } from 'react';
import './NotifPage.css';

class NotifPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        { id: 1, senderName: 'Usuario1', message: 'Mensaje de notificación 1', read: false },
        { id: 2, senderName: 'Usuario2', message: 'Mensaje de notificación 2', read: false },
        // ... puedes agregar más notificaciones según tu lógica de base de datos
      ],
    };
  }

  markAsRead = (notificationId) => {
    this.setState((prevState) => ({
      notifications: prevState.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      ),
    }));
  };

  deleteNotification = (notificationId) => {
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter((notification) => notification.id !== notificationId),
    }));
  };

  render() {
    return (
      <div className='main'>
        <h1>Notificaciones</h1>
        {this.state.notifications.map((notification) => (
          <div className={`notification-container ${notification.read ? 'read' : ''}`} key={notification.id}>
            <div className='user-icon'></div>
            <div className='notification-content'>
              <p className='sender-name'>{notification.senderName}</p>
              <p className='message'>{notification.message}</p>
            </div>
            <div className='action-buttons'>
              {!notification.read && (
                <button className='action-button mark-as-read' onClick={() => this.markAsRead(notification.id)}>
                  Marcar como leído
                </button>
              )}
              <button className='action-button delete' onClick={() => this.deleteNotification(notification.id)}>
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default NotifPage;
