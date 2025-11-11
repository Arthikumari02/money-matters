import { AuthStoreProvider, AuthProvider } from '@money-matters/auth';
import { LoginForm } from '@money-matters/auth';
import { DashboardLayout } from '@money-matters/dashboard';
import { Routes, Route } from 'react-router-dom';
import { I18nProvider } from '../i18n';

import { DashboardPage, DashboardProvider } from '@money-matters/dashboard';
import {
  TransactionPage,
  TransactionProvider,
} from '@money-matters/transaction';
import { ProfilePage, ProfileProvider } from '@money-matters/profile';

export function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        element={
          <AuthProvider>
            <DashboardLayout />
          </AuthProvider>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />

        <Route path="transactions">
          <Route index element={<TransactionPage />} />
          <Route path="user" element={<TransactionPage />} />
        </Route>

        <Route
          path="admin/transactions"
          element={
            <AuthProvider requireAdmin>
              <TransactionPage />
            </AuthProvider>
          }
        />

        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <AuthStoreProvider>
        <DashboardProvider>
          <TransactionProvider>
            <ProfileProvider>
              <AppContent />
            </ProfileProvider>
          </TransactionProvider>
        </DashboardProvider>
      </AuthStoreProvider>
    </I18nProvider>
  );
};

export default App;
