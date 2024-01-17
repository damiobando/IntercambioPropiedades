import React, { Component } from 'react';
import './NotifPage.css';

class NotifPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        { id: 1, senderName: 'Usuario1', message: 'Mensaje de notificación 1' },
        { id: 2, senderName: 'Usuario2', message: 'Mensaje de notificación 2' },
        // ... puedes agregar más notificaciones según tu lógica de base de datos
      ],
    };
  }

  render() {
    return (
      <div className='main'>
        <h1>Notificaciones</h1>
        {this.state.notifications.map((notification) => (
          <div className='notification-container' key={notification.id}>
            <div className='user-icon'></div>
            <div className='notification-content'>
              <p className='sender-name'>{notification.senderName}</p>
              <p className='message'>{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default NotifPage;
