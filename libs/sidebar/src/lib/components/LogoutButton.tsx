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
      className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
    >
      <LogoutIcon className="h-4 w-4" />
      Logout
    </button>
  );
};

export default LogoutButton;
