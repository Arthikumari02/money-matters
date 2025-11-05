import React from 'react';
import { useAuthStore } from '@money-matters/auth';
import { sidebarLinks } from '../model/Sidebarmodel';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import logo from '../../assets/money-matters-logo.png';
import * as styles from './Styles';

const Sidebar: React.FC = () => {
  const authStore = useAuthStore();
  const userInfo = authStore.userInfo;
  const userRole = authStore.isAdmin ? 'admin' : 'user';

  const links = sidebarLinks.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  );

  return (
    <aside className={styles.SidebarContainer}>
      <div className={styles.LogoContainer}>
        <img src={logo} alt="Money Matters Logo" className={styles.LogoImage} />
      </div>
      <nav className={styles.NavContainer}>
        <ul className={styles.NavList}>
          {links.map((link) => (
            <SidebarItem key={link.path} {...link} />
          ))}
        </ul>
      </nav>

      <div className={styles.FooterContainer}>
        <div className={styles.FooterUserInfoContainer}>
          <div className="flex items-center space-x-3">
            <div className={styles.UserAvatar}>
              {userInfo?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className={styles.UserDetailsContainer}>
              <p className={styles.UserName}>
                {userInfo?.fullName || 'User'}
              </p>
              <p className={styles.UserEmail}>
                {userInfo?.email || 'User'}
              </p>
            </div>
          </div>

          <div className={styles.LogoutWrapper}>
            <LogoutButton />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
