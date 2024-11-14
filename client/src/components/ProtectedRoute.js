import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  // Check if the token exists and is valid (not null or an empty string)
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
