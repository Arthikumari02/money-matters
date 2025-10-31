import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { sidebarLinks } from '../model/Sidebarmodel';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import logo from '../../assets/money-matters-logo.png';

const Sidebar: React.FC = () => {
  const authStore = useAuthStore();
  const userInfo = authStore.userInfo;
  const userRole = authStore.isAdmin ? 'admin' : 'user';

  const links = sidebarLinks.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  );

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <img src={logo} alt="Money Matters Logo" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-4">
          {links.map((link) => (
            <SidebarItem key={link.path} {...link} />
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {userInfo?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userInfo?.email || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {authStore.isAdmin ? 'Admin' : 'User'}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 ml-2">
            <LogoutButton />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
