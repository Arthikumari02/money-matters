import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { useLocation } from 'react-router-dom';
import UserTransactionsPage from './UserTransactionsPage';
import AdminTransactionsPage from './AdminTransactionsPage';

const TransactionsPage: React.FC = () => {
  const authStore = useAuthStore();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/transactions');

  if (!authStore.isAuthenticated) {
    return <div>Please log in to view transactions</div>;
  }

  if (
    (authStore.isAdmin && isAdminPath) ||
    (!authStore.isAdmin && !isAdminPath)
  ) {
    return authStore.isAdmin ? (
      <AdminTransactionsPage />
    ) : (
      <UserTransactionsPage />
    );
  }

  if (authStore.isAdmin) {
    window.location.href = '/transactions';
  } else {
    window.location.href = '/transactions';
  }

  return null;
};

export default TransactionsPage;
