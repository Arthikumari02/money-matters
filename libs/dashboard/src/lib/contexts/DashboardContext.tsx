import React, { createContext, useContext } from 'react';
import dashboardStore, { DashboardStore } from '../stores/DashboardStore';

const DashboardContext = createContext<DashboardStore | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> =
  function DashboardProvider({ children }) {
    return (
      <DashboardContext.Provider value={dashboardStore}>
        {children}
      </DashboardContext.Provider>
    );
  };

export const useDashboardStore = (): DashboardStore => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('DashboardStore must be used within a DashboardProvider');
  }
  return context;
};
