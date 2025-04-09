// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
