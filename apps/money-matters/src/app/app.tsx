import { AuthStoreProvider, RequireAuth } from '@money-matters/auth';
import { LoginForm } from '@money-matters/auth';
import { DashboardLayout } from '@money-matters/dashboard';
import { Routes, Route } from 'react-router-dom';

import { DashboardPage } from '@money-matters/dashboard';
import { TransactionPage } from '@money-matters/transaction';
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
        <Route path="transactions" element={<TransactionPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export const App: React.FC = () => {
  return (
    <AuthStoreProvider>
      <AppContent />
    </AuthStoreProvider>
  );
};

export default App;
