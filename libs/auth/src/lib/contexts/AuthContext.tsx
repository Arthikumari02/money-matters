import React, { createContext, useContext, useRef } from 'react';

import defaultAuthStore, { AuthStore } from '../stores/AuthStore';

const AuthStoreContext = createContext<AuthStore | undefined>(undefined);

interface AuthStoreProviderProps {
  children: React.ReactNode;
  value?: AuthStore;
}

export const AuthStoreProvider: React.FC<AuthStoreProviderProps> = ({
  children,
  value,
}) => {
  const authStoreRef = useRef(value ?? defaultAuthStore);
  return (
    <AuthStoreContext.Provider value={authStoreRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = (): AuthStore => {
  const context = useContext(AuthStoreContext);
  if (context === undefined) {
    throw new Error('useAuthStore must be used within an AuthStoreProvider');
  }
  return context;
};
