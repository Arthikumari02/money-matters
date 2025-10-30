import React from 'react';
import { Sidebar } from '@money-matters/sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />{' '}
      </main>
    </div>
  );
};

export default DashboardLayout;
