import React from "react";

const NotificationPopup = ({ notifications, onClose }) => {
  return (
    <div>
      <h3>Notifications</h3>
      <button onClick={onClose}>Close</button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.title}</strong>: {notification.message} <em>{notification.time}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPopup;
