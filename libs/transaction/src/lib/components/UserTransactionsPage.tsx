import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
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
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <div className="mb-6 flex justify-between items-center bg-white p-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('transactions_heading')}
          </h1>
          <LanguageSelector />
          <AddTransactionButton
            userId={authStore.userInfo?.id ?? ''}
            onSuccess={() => fetchTransactions()}
          />
        </div>

        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                {
                  id: 'all' as const,
                  label: t('tab.all_transactions'),
                  count: transactions.length,
                },
                {
                  id: 'credit' as const,
                  label: t('tab.credit'),
                  count: transactions.filter((t) => t.type === 'credit').length,
                },
                {
                  id: 'debit' as const,
                  label: t('tab.debit'),
                  count: transactions.filter((t) => t.type === 'debit').length,
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
                  <div className="flex items-center">{tab.label}</div>
                </button>
              ))}
            </nav>
          </div>
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-7 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100">
              <span className="text-center">{t('common_details.transaction_name')}</span>
              <span className="text-right">{t('common_details.category')}</span>
              <span className="text-center">{t('common_details.date')}</span>
              <span className="text-center">{t('common_details.amount')}</span>
            </div>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="max-h-[750px] overflow-y-auto divide-y divide-gray-200"
            >
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {t('no_transactions_found')}
                  </p>
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
      </div>
    </div>
  );
});

export default UserTransactionsPage;
