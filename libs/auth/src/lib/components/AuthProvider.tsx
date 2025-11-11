import React from 'react';
import { useAuthStore } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { loginPath, dashboardPath } from '../Constants/LoginFormConstants';

interface AuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const AuthProvider: React.FC<AuthProps> = ({ children, requireAdmin = false }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  if (requireAdmin && !authStore.isAdmin) {
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
