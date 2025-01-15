import React, { useEffect, useState } from 'react';
import { useRecentServices } from '../../Context/RecentServicesContext';
import './RecentServices.css';

const RecentServices = () => {
  const { services } = useRecentServices();
  const [timeAgo, setTimeAgo] = useState({});

  // Update time ago every minute
  useEffect(() => {
    const updateTimeAgo = () => {
      const newTimeAgo = {};
      services.forEach(service => {
        const diff = new Date() - new Date(service.timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) newTimeAgo[service.id] = `${days} days ago`;
        else if (hours > 0) newTimeAgo[service.id] = `${hours} hours ago`;
        else if (minutes > 0) newTimeAgo[service.id] = `${minutes} minutes ago`;
        else newTimeAgo[service.id] = 'Just now';
      });
      setTimeAgo(newTimeAgo);
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [services]);

  return (
    <div className="recent-services">
      <h2 className="recent-services__title">Recent Services</h2>
      <div className="recent-services__table-container">
        <table className="recent-services__table">
          <thead>
            <tr>
              <th>Name ↑</th>
              <th>Type</th>
              <th>Last Opened</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.type}</td>
                <td>{timeAgo[service.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {services.length > 5 && (
        <button className="recent-services__see-all">See all</button>
      )} */}
    </div>
  );
};

export default RecentServices;