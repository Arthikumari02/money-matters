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
import * as styles from './Styles';

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
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !isLoading) {
      fetchTransactions(activeTab);
    }
  }, [hasMore, isLoading, fetchTransactions, activeTab]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) =>
      activeTab === 'all' ? true : tx.type === activeTab
    );
  }, [transactions, activeTab]);

  if (isLoading && transactions.length === 0) return <PageLoader />;
  if (error)
    return (
      <div className="p-4">
        <PageError error={'Not Found'} />
      </div>
    );

  return (
    <div className={styles.PageContainer}>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderFlex}>
          <h1 className={styles.HeaderTitle}>{t('transactions_heading')}</h1>
          <div className={styles.HeaderActions}>
            <LanguageSelector />
            <AddTransactionButton
              userId={authStore.userInfo?.id ?? ''}
              onSuccess={() => fetchTransactions()}
            />
          </div>
        </div>

        <nav className={styles.TabsContainer}>
          {[
            { id: 'all' as const, label: t('tab.all_transactions') },
            { id: 'debit' as const, label: t('tab.debit') },
            { id: 'credit' as const, label: t('tab.credit') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.TabButtonBase} ${activeTab === tab.id ? styles.TabActive : styles.TabInactive
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.UserCardContainer}>
        <div className={styles.UserTableHeader}>
          <span className={styles.UserTableHeaderItemLeft}>
            {t('common_details.transaction_name')}
          </span>
          <span className={styles.UserTableHeaderItemRight}>
            {t('common_details.category')}
          </span>
          <span className={styles.UserTableHeaderItemCenter}>
            {t('common_details.date')}
          </span>
          <span className={styles.UserTableHeaderItemCenter}>
            {t('common_details.amount')}
          </span>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={styles.UserScrollContainer}
        >
          {filteredTransactions.length === 0 ? (
            <div className={styles.NoTransactionsText}>
              {t('no_transactions_found')}
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <TransactionItemUser
                key={tx.id}
                id={tx.id}
                description={tx.name}
                category={tx.category}
                timestamp={tx.date}
                amount={
                  tx.type === 'debit'
                    ? `-${tx.amount}`
                    : `+${tx.amount}`
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
