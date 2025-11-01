import React, { createContext, useContext } from 'react';
import { ProfileStore } from '../stores/ProfileStore';
import { useProfileApi } from '../hooks/useProfileApi';

const ProfileContext = createContext<ProfileStore | null>(null);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const api = useProfileApi();
  const store = new ProfileStore(api);
  return (
    <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
  );
};

export const useProfileStore = () => {
  const store = useContext(ProfileContext);
  if (!store)
    throw new Error('useProfileStore must be used within a ProfileProvider');
  return store;
};
