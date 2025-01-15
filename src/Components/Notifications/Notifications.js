import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar'; // Adjust the path as necessary
import './Notifications.css'; // Import the CSS file

const Notifications = ({ notifications }) => {
  // Function to group notifications by date
  const groupNotificationsByDate = (notifications) => {
    const groupedNotifications = {
      today: [],
      yesterday: [],
      older: [],
    };

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    notifications.forEach(notification => {
      const notificationDate = new Date(notification.date);
      if (notificationDate.toDateString() === today.toDateString()) {
        groupedNotifications.today.push(notification);
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        groupedNotifications.yesterday.push(notification);
      } else {
        groupedNotifications.older.push(notification);
      }
    });

    return groupedNotifications;
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="notifications-page">
      <Sidebar />
      <div className="notifications-content">
        <h1>Your Notifications</h1>

        {groupedNotifications.today.length > 0 && (
          <div className="notification-group">
            <h2>Today</h2>
            <ul>
              {groupedNotifications.today.map(notification => (
                <li key={notification.id}>
                  <span>{notification.message} ({notification.time})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {groupedNotifications.yesterday.length > 0 && (
          <div className="notification-group">
            <h2>Yesterday</h2>
            <ul>
              {groupedNotifications.yesterday.map(notification => (
                <li key={notification.id}>
                  <span>{notification.message} ({notification.time})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {groupedNotifications.older.length > 0 && (
          <div className="notification-group">
            <h2>Older Notifications</h2>
            <ul>
              {groupedNotifications.older.map(notification => (
                <li key={notification.id}>
                  <span>{notification.message} ({notification.time})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {notifications.length === 0 && <p>No notifications available.</p>}
      </div>
    </div>
  );
};

export default Notifications;