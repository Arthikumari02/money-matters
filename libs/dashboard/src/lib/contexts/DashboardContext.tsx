import React, { createContext, useContext } from 'react';
import { DashboardStore } from '../stores/DashboardStore';

const DashboardContext = createContext<DashboardStore | undefined>(undefined);

const dashboardStore = new DashboardStore();
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DashboardContext.Provider value={dashboardStore}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardStore = (): DashboardStore => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardStore must be used within a DashboardProvider'
    );
  }
  return context;
};
