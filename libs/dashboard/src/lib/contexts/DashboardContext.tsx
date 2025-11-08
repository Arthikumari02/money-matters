import React, { createContext, useContext } from 'react';
import { DashboardStore } from '../stores/DashboardStore';

const DashboardContext = createContext<DashboardStore | undefined>(undefined);

export const DashboardProvider: React.FC<{
  value?: DashboardStore;
  children: React.ReactNode;
}> = ({ value, children }) => {
  const store = value ?? new DashboardStore();
  return (
    <DashboardContext.Provider value={store}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardStore = (): DashboardStore => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardStore must be used within DashboardProvider');
  }
  return context;
};
