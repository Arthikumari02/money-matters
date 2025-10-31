import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useAdminTransactionsApi } from '../hooks/apis/useAdminTransactionApi';
import { TransactionItemAdmin } from '@money-matters/ui';

const AdminTransactionsPage: React.FC = observer(() => {
  const {
    transactions,
    isLoading,
    error,
    hasMore,
    fetchTransactions,
  } = useAdminTransactionsApi();

  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch initial data whenever tab changes
  useEffect(() => {
    fetchTransactions(activeTab, true);
  }, [activeTab, fetchTransactions]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore && !isLoading) {
      fetchTransactions(activeTab);
    }
  }, [hasMore, isLoading, fetchTransactions, activeTab]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions;
    return transactions.filter((tx) => tx.type === activeTab);
  }, [transactions, activeTab]);

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
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <div className="max-w-6xl mx-auto w-full p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Transactions
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-8">
            {[
              { id: 'all' as const, label: 'All Transactions' },
              { id: 'debit' as const, label: 'Debit' },
              { id: 'credit' as const, label: 'Credit' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100">
            <span className='text-right'>User Name</span>
            <span className='text-right'>Transaction Name</span>
            <span className='text-right'>Category</span>
            <span className='text-right'>Date</span>
            <span className="text-right">Amount</span>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="max-h-[720px] overflow-y-auto"
          >
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No {activeTab === 'all' ? '' : activeTab} transactions found
              </div>
            ) : (
              filteredTransactions.map((tx) => (
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

            {/* Loader at bottom */}
            {isLoading && filteredTransactions.length > 0 && (
              <div className="py-4 flex justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminTransactionsPage;
