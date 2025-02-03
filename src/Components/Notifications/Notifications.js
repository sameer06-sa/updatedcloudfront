import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar'; // Adjust the path as necessary
import './Notifications.css'; // Import the CSS file

const apiUrl = process.env.REACT_APP_API_URL;

const Notifications = ({ userEmail }) => {
  // State to store notifications
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/notifications/yasmin@gmail.com`);
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchNotifications();
  }, [userEmail]); // Fetch notifications when the component mounts or email changes

  // Group the notifications by date
  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="notifications-page">
      <Sidebar />
      <div className="notifications-content">
        <h1>Your Notifications</h1>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {groupedNotifications.today.length > 0 && (
          <div className="notification-group">
            <h2>Today</h2>
            <ul>
              {groupedNotifications.today.map(notification => (
                <li key={notification._id}>
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
                <li key={notification._id}>
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
                <li key={notification._id}>
                  <span>{notification.message} ({notification.time})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {notifications.length === 0 && !loading && <p>No notifications available.</p>}
      </div>
    </div>
  );
};

export default Notifications;
