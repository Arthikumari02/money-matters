import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { Navigate } from 'react-router-dom';
import AdminTransactionsPage from './AdminTransactionsPage';
import UserTransactionsPage from './UserTransactionsPage';

const TransactionsPage: React.FC = () => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (authStore.isAdmin) {
    return <AdminTransactionsPage />;
  }
  else {
    return <UserTransactionsPage />;
  }
};

export default TransactionsPage;
