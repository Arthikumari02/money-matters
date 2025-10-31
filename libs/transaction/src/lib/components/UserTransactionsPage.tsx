import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useUserTransactionsApi } from '../hooks/apis/useUserTransactions';
import { useAuthStore } from '@money-matters/auth';
import { TransactionItemUser } from '@money-matters/ui';
import { format } from 'date-fns';

const UserTransactionsPage: React.FC = observer(() => {
  const authStore = useAuthStore();
  const userId = authStore.userInfo?.id || '';
  const {
    transactions,
    isLoading,
    error,
    hasMore,
    fetchTransactions,
    deleteTransaction,
  } = useUserTransactionsApi(userId);

  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all');
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 16;

  useEffect(() => {
    fetchTransactions(activeTab, true);
  }, [activeTab]);


  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (hasMore && !isLoading) {
        fetchTransactions(activeTab);
      }
    }
  }, [hasMore, isLoading, fetchTransactions, activeTab]);


  const { totalCredit, totalDebit, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'credit') {
          acc.totalCredit += transaction.amount;
        } else if (transaction.type === 'debit') {
          acc.totalDebit += transaction.amount;
        }
        acc.balance = acc.totalCredit - acc.totalDebit;
        return acc;
      },
      { totalCredit: 0, totalDebit: 0, balance: 0 }
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      if (activeTab === 'all') return true;
      return transaction.type === activeTab;
    });
  }, [transactions, activeTab]);

  console.log('Transaction counts:', {
    all: transactions.length,
    credit: transactions.filter(t => t.type === 'credit').length,
    debit: transactions.filter(t => t.type === 'debit').length,
    filtered: filteredTransactions.length,
    summary: { totalCredit, totalDebit, balance }
  });

  const visibleTransactions = filteredTransactions;

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

  const handleEdit = useCallback((id: string) => {
    console.log('Edit transaction:', id);
  }, []);


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
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Transactions</h1>
        </div>

        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                {
                  id: 'all' as const,
                  label: 'All Transactions',
                  count: transactions.length
                },
                {
                  id: 'credit' as const,
                  label: 'Credit',
                  count: transactions.filter(t => t.type === 'credit').length
                },
                {
                  id: 'debit' as const,
                  label: 'Debit',
                  count: transactions.filter(t => t.type === 'debit').length
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center">
                    {tab.label}

                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="max-h-[750px] overflow-y-auto divide-y divide-gray-200"
          >
            {visibleTransactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab === 'all' ? '' : activeTab} transactions found</p>
              </div>
            ) : (
              visibleTransactions.map((transaction) => (
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
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserTransactionsPage;
