import { AuthStoreProvider, RequireAuth } from '@money-matters/auth';
import { LoginForm } from '@money-matters/auth';
import { DashboardLayout } from '@money-matters/dashboard';
import { Routes, Route } from 'react-router-dom';

import { DashboardPage, DashboardProvider } from '@money-matters/dashboard';
import {
  TransactionPage,
  TransactionProvider,
} from '@money-matters/transaction';
import { ProfilePage } from '@money-matters/profile';

export function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
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
            <RequireAuth requireAdmin>
              <TransactionPage />
            </RequireAuth>
          }
        />

        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export const App: React.FC = () => {
  return (
    <AuthStoreProvider>
      <DashboardProvider>
        <TransactionProvider>
          <AppContent />
        </TransactionProvider>
      </DashboardProvider>
    </AuthStoreProvider>
  );
};

export default App;
