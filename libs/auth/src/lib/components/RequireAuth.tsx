import React from 'react';
import { useAuthStore } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const RequireAuth: React.FC<AuthProps> = ({ children, requireAdmin = false }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !authStore.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
