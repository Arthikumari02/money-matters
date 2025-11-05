import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useUserTransactionsApi } from '../hooks/apis/useUserTransactions';
import { useAuthStore } from '@money-matters/auth';
import {
  TransactionItemUser,
  AddTransactionButton,
  LanguageSelector,
  PageLoader,
  PageError,
} from '@money-matters/ui';
import { useTranslation } from 'react-i18next';

const UserTransactionsPage: React.FC = observer(() => {
  const authStore = useAuthStore();
  const userId = authStore.userInfo?.id || '';
  const { transactions, isLoading, error, hasMore, fetchTransactions } =
    useUserTransactionsApi(userId);

  const { t } = useTranslation('transaction');

  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'debit'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (activeTab === 'all') return true;
      return transaction.type === activeTab;
    });
  }, [transactions, activeTab]);

  if (isLoading && transactions.length === 0) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="p-4">
        <PageError error={'Not Found'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="bg-white p-2 px-8 mb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#343C6A]">
            {t('transactions_heading')}
          </h1>
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <AddTransactionButton
              userId={authStore.userInfo?.id ?? ''}
              onSuccess={() => fetchTransactions()}
              className="!rounded-lg !px-4 !py-1 text-sm font-semibold bg-blue-600 hover:bg-blue-700 transition-all"
            />
          </div>
        </div>

        <nav className="flex">
          {[
            { id: 'all' as const, label: t('tab.all_transactions') },
            { id: 'debit' as const, label: t('tab.debit') },
            { id: 'credit' as const, label: t('tab.credit') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-6 text-sm font-medium border-b-2 transition-all ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white p-7 rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-4 px-7 py-3 text-sm font-semibold text-gray-600  border-b border-gray-100">
          <span className="text-left">
            {t('common_details.transaction_name')}
          </span>
          <span className="text-right">
            {t('common_details.category')}
          </span>
          <span className="text-center">{t('common_details.date')}</span>
          <span className="text-center">{t('common_details.amount')}</span>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="max-h-[700px] overflow-y-auto divide-y divide-gray-100"
        >
          {filteredTransactions.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              {t('no_transactions_found')}
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <TransactionItemUser
                key={transaction.id}
                id={transaction.id}
                description={transaction.name}
                category={transaction.category}
                timestamp={transaction.date}
                amount={
                  transaction.type === 'debit'
                    ? `-${transaction.amount}`
                    : `+${transaction.amount}`
                }
                userId={userId}
                onDeleteSuccess={() => fetchTransactions()}
                onUpdateSuccess={() => fetchTransactions()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default UserTransactionsPage;
