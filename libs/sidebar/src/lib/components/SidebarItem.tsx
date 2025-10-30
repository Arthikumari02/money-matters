import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
          ${
            isActive
              ? 'bg-blue-50 text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <span className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-blue-600">
          {icon}
        </span>
        {label}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
