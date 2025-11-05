import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useAdminTransactionsApi } from '../hooks/apis/useAdminTransactionApi';
import {
  TransactionItemAdmin,
  PageLoader,
  LanguageSelector,
} from '@money-matters/ui';
import { useTranslation } from 'react-i18next';

const AdminTransactionsPage: React.FC = observer(() => {
  const { t } = useTranslation('transaction');
  const { transactions, isLoading, error, hasMore, fetchTransactions } =
    useAdminTransactionsApi();

  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTransactions(activeTab, true);
  }, [activeTab]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (
      scrollTop + clientHeight >= scrollHeight - 20 &&
      hasMore &&
      !isLoading
    ) {
      fetchTransactions(activeTab);
    }
  }, [hasMore, isLoading, activeTab]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions;
    return transactions.filter((tx) => tx.type === activeTab);
  }, [transactions, activeTab]);

  if (isLoading && transactions.length === 0) {
    return <PageLoader />;
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
      <div className="bg-white p-7">
        <div className="flex flex-row justify-between w-full py-2">
          <h1 className="text-2xl font-semibold text-[#343C6A] mb-1">
            {t('transactions_heading')}
          </h1>
          <LanguageSelector />
        </div>
        <div className="">
          <nav className="flex space-x-8">
            {[
              { id: 'all' as const, label: t('tab.all_transactions') },
              { id: 'debit' as const, label: t('tab.debit') },
              { id: 'credit' as const, label: t('tab.credit') },
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
      </div>
      <div className="max-w-6xl mx-auto w-full p-8">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <div className="grid grid-cols-5 px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100">
            <span className="text-right">{t('admin_details.user_name')}</span>
            <span className="text-right">{t('common_details.transaction_name')}</span>
            <span className="text-right">{t('common_details.category')}</span>
            <span className="text-right">{t('common_details.date')}</span>
            <span className="text-right">{t('common_details.amount')}</span>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="max-h-[720px] overflow-y-auto"
          >
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {t('no_transactions_found')}
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
