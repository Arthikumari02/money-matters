import React from 'react';
import { 
  FiHome, 
  FiDollarSign, 
  FiUser, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';

export const DashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiHome className="h-5 w-5" {...props} />
);

export const TransactionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiDollarSign className="h-5 w-5" {...props} />
);

export const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiUser className="h-5 w-5" {...props} />
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiSettings className="h-5 w-5" {...props} />
);

export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FiLogOut className="h-5 w-5" {...props} />
);
