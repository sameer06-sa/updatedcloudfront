import { useEffect, useRef } from 'react';
import { useRecentServices } from '../Context/RecentServicesContext';

export const useServiceTracking = () => {
  const { trackService } = useRecentServices();
  const isTracking = useRef(false);

  const startTracking = (serviceName, serviceType) => {
    if (!isTracking.current) {
      isTracking.current = true;
      trackService(serviceName, serviceType);
    }
  };

  useEffect(() => {
    return () => {
      isTracking.current = false;
    };
  }, []);

  return startTracking;
};
