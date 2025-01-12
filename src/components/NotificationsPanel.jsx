import React from 'react';

function NotificationsPanel() {
  const notifications = [
    { id: 29, type: 'Alert', message: 'Incident 29 has been completed.', time: '2025/01/11 17:23' },
    { id: 28, type: 'Alert', message: 'Incident 28 created.', time: '2025/01/10 14:57' },
  ];

  return (
    <div className="w-80 bg-white border-l p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id} className="mb-4">
          <p>
            <strong>{notification.type} #{notification.id}:</strong> {notification.message}
          </p>
          <small>{notification.time}</small>
        </div>
      ))}
    </div>
  );
}

export default NotificationsPanel;
