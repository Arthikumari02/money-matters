import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useAdminTransactionsApi } from '../hooks/apis/useAdminTransactionApi';
import {
  TransactionItemAdmin,
  PageLoader,
  LanguageSelector,
} from '@money-matters/ui';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

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
    if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore && !isLoading) {
      fetchTransactions(activeTab);
    }
  }, [hasMore, isLoading, activeTab]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions;
    return transactions.filter((tx) => tx.type === activeTab);
  }, [transactions, activeTab]);

  if (isLoading && transactions.length === 0) return <PageLoader />;
  if (error)
    return (
      <div className="p-4">
        <div className={styles.AdminErrorContainer}>{error}</div>
      </div>
    );

  return (
    <div className={styles.AdminOuterContainer}>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderFlex}>
          <h1 className={styles.HeaderTitle}>{t('transactions_heading')}</h1>
          <LanguageSelector />
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

      <div className={styles.AdminInnerContainer}>
        <div className={styles.AdminCard}>
          <div className={styles.AdminTableHeader}>
            <span className="text-right">{t('admin_details.user_name')}</span>
            <span className="text-right">{t('common_details.transaction_name')}</span>
            <span className="text-right">{t('common_details.category')}</span>
            <span className="text-right">{t('common_details.date')}</span>
            <span className="text-right">{t('common_details.amount')}</span>
          </div>

          <div ref={scrollContainerRef} onScroll={handleScroll} className={styles.AdminScrollContainer}>
            {filteredTransactions.length === 0 ? (
              <div className={styles.NoAdminTransactions}>{t('no_transactions_found')}</div>
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
                <div className={styles.AdminLoadingSpinner}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminTransactionsPage;
