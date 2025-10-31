import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTransactions } from '../contexts/TransactionContext';
import { TransactionItemAdmin } from '@money-matters/ui';

const AdminTransactionsPage: React.FC = observer(() => {
  const store = useTransactions();
  const {
    transactions,
    isLoading,
    error,
    activeTab,
    hasMore,
    fetchTransactions,
    switchTab,
  } = store;

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.fetchTransactions(true);
  }, [store.activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        fetchTransactions();
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  if (isLoading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <div className="max-w-6xl mx-auto w-full p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>

        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-8">
            {['all', 'debit', 'credit'].map((tab) => {
              const isActive = activeTab === tab;
              const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
              return (
                <button
                  key={tab}
                  onClick={() => switchTab(tab as any)}
                  className={`py-3 border-b-2 font-medium text-sm ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tabName}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100">
            <span>User Name</span>
            <span>Transaction Name</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-right">Amount</span>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No transactions found
            </div>
          ) : (
            transactions.map((tx) => (
              <TransactionItemAdmin
                key={tx.id}
                transaction={{
                  id: tx.id,
                  name: tx.name,
                  userName: tx.userName || 'Unknown',
                  category: tx.category || 'General',
                  type: tx.type,
                  amount: tx.amount,
                  date: new Date(tx.date || tx.createdAt).toLocaleString(),
                  userAvatar: tx.userAvatar,
                }}
              />
            ))
          )}
          {/* Loader */}
          {isLoading && transactions.length > 0 && (
            <div className="py-4 flex justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <div ref={loaderRef}></div>
        </div>
      </div>
    </div>
  );
});

export default AdminTransactionsPage;
