import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar'; // Adjust path if necessary
import Header from '../../Components/Header/Header'; // Import Header component
import './Notifications.css'; // Import the CSS file

const apiUrl = process.env.REACT_APP_API_URL;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData.email) {
          setUserEmail(parsedUserData.email);
          console.log("✅ Found userEmail:", parsedUserData.email);
          fetchNotifications(parsedUserData.email); // Call API here
        } else {
          console.error("❌ Email not found inside userData");
          setError("User email is missing. Please log in again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Failed to parse userData from localStorage:", error);
        setError("Error reading user data. Please try again.");
        setLoading(false);
      }
    } else {
      console.error("❌ No userData found in localStorage");
      setError("User data not found. Please log in.");
      setLoading(false);
    }
  }, []);

  const fetchNotifications = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/notifications/${email}`);
      setNotifications(response.data);
    } catch (err) {
      console.error("❌ Failed to load notifications:", err);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const groupNotificationsByDate = (notifications) => {
    const groupedNotifications = { today: [], yesterday: [], older: [] };
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

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="notifications-page">
      <Sidebar />
      <div className="notifications-content">
        <Header /> {/* Added Header component here */}
        
        <h1>Your Notifications</h1> {/* Only one heading here */}

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display notifications grouped by date */}
        {Object.entries(groupedNotifications).map(([key, notifications]) => (
          notifications.length > 0 && (
            <div className="notification-group" key={key}>
              <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2> {/* Capitalize the section title */}
              <ul>
                {notifications.map(notification => (
                  <li key={notification._id}>
                    <span className="notification-item">
                      <span>{notification.message}</span>
                      <span>{formatDateTime(notification.date)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}

        {notifications.length === 0 && !loading && <p>No notifications available.</p>}
      </div>
    </div>
  );
};

export default Notifications;
