import React from 'react';
import { useAuthStore } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<AuthProps> = ({ children }) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;
