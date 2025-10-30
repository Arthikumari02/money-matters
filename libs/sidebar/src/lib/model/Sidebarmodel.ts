import { makeObservable, observable, action } from 'mobx';
import React, { ReactElement } from 'react';
import {
  DashboardIcon,
  TransactionsIcon,
  ProfileIcon,
} from '../components/Icons';

export interface SidebarLink {
  label: string;
  path: string;
  icon: ReactElement;
  roles?: string[];
}

export class SidebarModel {
  links: SidebarLink[];
  activePath: string;

  constructor(links: SidebarLink[], initialPath: string = '/dashboard') {
    this.links = links;
    this.activePath = initialPath;

    makeObservable(this, {
      activePath: observable,
      setActivePath: action,
      setLinks: action,
    });
  }

  setActivePath(path: string) {
    this.activePath = path;
  }

  setLinks(links: SidebarLink[]) {
    this.links = links;
  }

  get visibleLinks() {
    return this.links;
  }
}

// Create icon elements with proper props
const dashboardIcon = React.createElement(DashboardIcon, {
  className: 'h-5 w-5',
});
const transactionsIcon = React.createElement(TransactionsIcon, {
  className: 'h-5 w-5',
});
const profileIcon = React.createElement(ProfileIcon, { className: 'h-5 w-5' });

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: dashboardIcon,
    roles: ['user', 'admin'],
  },
  {
    label: 'All Transactions',
    path: '/transactions',
    icon: transactionsIcon,
    roles: ['admin'],
  },
  {
    label: 'Your Transactions',
    path: '/transactions',
    icon: transactionsIcon,
    roles: ['user'],
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: profileIcon,
    roles: ['user', 'admin'],
  },
];
