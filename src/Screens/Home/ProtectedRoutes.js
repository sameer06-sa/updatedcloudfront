import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate 
      to="/signin" 
      state={{ from: location, message: 'Please sign in to access this page.' }} 
      replace 
    />
  );
};

export default ProtectedRoute;