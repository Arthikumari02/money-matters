import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Styles';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon }) => {
  return (
    <li className={styles.SidebarItemContainer}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${styles.SidebarItemLinkBase} ${isActive
            ? styles.SidebarItemLinkActive
            : styles.SidebarItemLinkInactive
          }`
        }
      >
        <span className={styles.SidebarItemIcon}>{icon}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
