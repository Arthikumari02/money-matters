import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../components/Icons';

const LogoutButton = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center py-2 bg-[transparent] text-#718EBF rounded-xl font-medium transition-colors"
    >
      <LogoutIcon className="h-4 w-4" />
    </button>
  );
};

export default LogoutButton;
