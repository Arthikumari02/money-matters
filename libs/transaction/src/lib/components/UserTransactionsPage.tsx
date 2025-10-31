import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useUserTransactions } from '../hooks/apis/useUserTransactions';
import { useAuthStore } from '@money-matters/auth';
import { TransactionItemUser } from '@money-matters/ui';

const UserTransactionsPage: React.FC = observer(() => {
  const authStore = useAuthStore();
  const userId = authStore.userInfo?.id || '';

  const {
    transactions,
    isLoading,
    error,
    activeTab,
    hasMore,
    summary,
    fetchTransactions,
    setActiveTab,
    deleteTransaction,
    setSearchQuery,
  } = useUserTransactions(userId);

  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTransactions(true);
  }, [activeTab, fetchTransactions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchTransactions();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, fetchTransactions]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        setIsDeleting((prev) => ({ ...prev, [id]: true }));
        await deleteTransaction(id);
      } catch (err) {
        console.error('Failed to delete transaction:', err);
      } finally {
        setIsDeleting((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit transaction:', id);
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Transactions
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-xl font-semibold">
              ₹
              {summary.balance.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-xl font-semibold text-green-600">
              +₹
              {summary.income.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-xl font-semibold text-red-600">
              -₹
              {Math.abs(summary.expense).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'all' as const, label: 'All Transactions' },
                { id: 'credit' as const, label: 'Credit' },
                { id: 'debit' as const, label: 'Debit' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search transactions..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Transactions List */}
          <div className="divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <TransactionItemUser
                  key={transaction.id}
                  description={transaction.name}
                  category={transaction.category}
                  timestamp={transaction.date}
                  amount={
                    transaction.type === 'debit'
                      ? `-${transaction.amount}`
                      : `+${transaction.amount}`
                  }
                  onEdit={() => handleEdit(transaction.id)}
                  onDelete={() => handleDelete(transaction.id)}
                />
              ))
            )}
            <div ref={loaderRef} className="h-1" />
            {isLoading && transactions.length > 0 && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserTransactionsPage;
