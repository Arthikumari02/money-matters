import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { Navigate } from 'react-router-dom';
import AdminTransactionsPage from './AdminTransactionsPage';

interface TransactionsPageProps {
  isAdminView?: boolean;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ isAdminView = false }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (authStore.isAdmin) {
    return isAdminView ? (
      <AdminTransactionsPage />
    ) : (
      <Navigate to="/admin/transactions" replace />
    );
  }

  // For non-admin users, redirect to a different page or show a message
  return <Navigate to="/unauthorized" replace />;
};

export default TransactionsPage;
