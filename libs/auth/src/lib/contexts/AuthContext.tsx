import React, { createContext, useContext, useRef } from 'react';
import authStore, { AuthStore } from '../stores/AuthStore';

const AuthContext = createContext<AuthStore | undefined>(undefined);

export const AuthStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authStoreRef = useRef(authStore);
  return (
    <AuthContext.Provider value={authStoreRef.current}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = (): AuthStore => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthStore must be used within an AuthStoreProvider');
  }
  return context;
};
