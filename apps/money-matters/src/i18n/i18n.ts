import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enDashboard from './locales/en/dashboard.json';
import enProfile from './locales/en/profile.json';
import enTransaction from './locales/en/transaction.json';
import enSidebar from './locales/en/sidebar.json';
import enModal from './locales/en/modal.json';
import enAuth from './locales/en/auth.json';

import hiDashboard from './locales/hi/dashboard.json';
import hiProfile from './locales/hi/profile.json';
import hiTransaction from './locales/hi/transaction.json';
import hiSidebar from './locales/hi/sidebar.json';
import hiModal from './locales/hi/modal.json';
import hiAuth from './locales/hi/auth.json';

import teDashboard from './locales/te/dashboard.json';
import teProfile from './locales/te/profile.json';
import teTransaction from './locales/te/transaction.json';
import teSidebar from './locales/te/sidebar.json';
import teModal from './locales/te/modal.json';
import teAuth from './locales/te/auth.json';

const resources = {
  en: {
    dashboard: enDashboard,
    profile: enProfile,
    transaction: enTransaction,
    sidebar: enSidebar,
    modal: enModal,
    auth: enAuth,
  },
  hi: {
    dashboard: hiDashboard,
    profile: hiProfile,
    transaction: hiTransaction,
    sidebar: hiSidebar,
    modal: hiModal,
    auth: hiAuth,
  },
  te: {
    dashboard: teDashboard,
    profile: teProfile,
    transaction: teTransaction,
    sidebar: teSidebar,
    modal: teModal,
    auth: teAuth,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  defaultNS: 'dashboard',
  interpolation: { escapeValue: false },
});

export default i18n;
