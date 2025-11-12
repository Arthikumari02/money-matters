import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useAdminTransactionsApi } from '../hooks/apis/useAdminTransactionApi';
import {
  PageError,
  PageLoader,
  LanguageSelector,
  TransactionTable,
} from '@money-matters/ui';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

type TabType = 'all' | 'credit' | 'debit';

// Convert transaction type to match our tab type format
const normalizeTransactionType = (type: string): 'credit' | 'debit' =>
  type.toLowerCase() as 'credit' | 'debit';

const AdminTransactionsPage: React.FC = observer(() => {
  const { t } = useTranslation('transaction');
  const { transactions, isLoading, error, hasMore, fetchTransactions } =
    useAdminTransactionsApi();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTransactions(activeTab, true);
  }, [activeTab, fetchTransactions]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore && !isLoading) {
      fetchTransactions(activeTab);
    }
  }, [hasMore, isLoading, activeTab, fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions;
    return transactions.filter((tx) =>
      normalizeTransactionType(tx.type) === activeTab
    );
  }, [transactions, activeTab]);


  const renderLoading = () => (
    <PageLoader />
  );

  const renderError = () => (
    <PageError error={error} />
  );

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const renderTabs = () => {
    const tabs: { id: TabType; label: string }[] = [
      { id: 'all', label: t('tab.all_transactions') },
      { id: 'debit', label: t('tab.debit') },
      { id: 'credit', label: t('tab.credit') },
    ];

    return (
      <nav className={styles.TabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${styles.TabButtonBase} ${activeTab === tab.id ? styles.TabActive : styles.TabInactive
              }`}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    );
  };

  const renderHeader = () => (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderFlex}>
        <h1 className={styles.HeaderTitle}>{t('transactions_heading')}</h1>
        <LanguageSelector />
      </div>
      {renderTabs()}
    </div>
  );

  const renderTransactionTable = () => (
    <div className={styles.AdminCard}>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={styles.AdminScrollContainer}
      >
        <TransactionTable
          transactions={filteredTransactions.map((tx) => ({
            id: tx.id,
            userId: tx.userId || '',
            description: tx.name,
            category: tx.category || 'General',
            timestamp: new Date(tx.date || tx.createdAt).toISOString(),
            amount: tx.type === 'Debit' ? -Math.abs(tx.amount) : Math.abs(tx.amount),
            userName: tx.userName || 'Unknown',
            userAvatar: tx.userAvatar,
          }))}
          showHeader={true}
          className="w-full"
          onDeleteSuccess={() => fetchTransactions(activeTab, true)}
          onUpdateSuccess={() => fetchTransactions(activeTab, true)}
        />
      </div>
    </div>
  );

  const renderContent = () => (
    <div className={styles.AdminInnerContainer}>
      {renderTransactionTable()}
    </div>
  );

  if (isLoading && transactions.length === 0) return renderLoading();
  if (error) return renderError();

  return (
    <div className={styles.AdminOuterContainer}>
      {renderHeader()}
      {renderContent()}
    </div>
  );
});

export default AdminTransactionsPage;
