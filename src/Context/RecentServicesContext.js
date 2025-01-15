import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentServicesContext = createContext();

export const RecentServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  // Real-time service tracking
  const trackService = (serviceName, serviceType) => {
    setServices(prevServices => {
      const currentTime = new Date().toISOString();
      const newService = {
        id: Date.now(), // Unique identifier
        name: serviceName,
        type: serviceType,
        timestamp: currentTime,
      };

      // Remove duplicate if exists and add new entry at the beginning
      const filteredServices = prevServices.filter(service => 
        service.name !== serviceName || service.type !== serviceType
      );
      
      const updatedServices = [newService, ...filteredServices].slice(0, 10);
      localStorage.setItem('recentServices', JSON.stringify(updatedServices));
      return updatedServices;
    });
  };

  // Initial load from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('recentServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  return (
    <RecentServicesContext.Provider value={{ services, trackService }}>
      {children}
    </RecentServicesContext.Provider>
  );
};

export const useRecentServices = () => useContext(RecentServicesContext);