import React, { createContext, useContext } from 'react';
import { AdminTransactionsStore } from '../stores/AdminTransactionStore';

const TransactionContext = createContext<AdminTransactionsStore | null>(null);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = new AdminTransactionsStore();
  return (
    <TransactionContext.Provider value={store}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error('useTransactions must be used within TransactionProvider');
  return context;
};
