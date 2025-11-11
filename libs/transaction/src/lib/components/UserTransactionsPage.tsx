import React from "react";
import { observer } from "mobx-react-lite";
import { useUserTransactionsApi } from "../hooks/apis/useUserTransactions";
import { useAuthStore } from "@money-matters/auth";
import {
  AddTransactionButton,
  LanguageSelector,
  PageLoader,
  PageError,
  TransactionTable,
} from "@money-matters/ui";
import { useTranslation } from "react-i18next";
import * as styles from "./Styles";

type TabType = 'all' | 'credit' | 'debit';

const UserTransactionsPage: React.FC = observer(() => {
  const authStore = useAuthStore();
  const userId = authStore.userInfo?.id || "";
  const { store, fetchAllTransactions } = useUserTransactionsApi(userId);
  const { t } = useTranslation("transaction");

  // ===== Render Functions ===== //

  const renderLoading = () => <PageLoader />;

  const renderError = () => <PageError error={store.error} />;

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
            onClick={() => store.setActiveTab(tab.id)}
            className={`${styles.TabButtonBase} ${
              store.activeTab === tab.id ? styles.TabActive : styles.TabInactive
            }`}
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
        <h1 className={styles.HeaderTitle}>{t("transactions_heading")}</h1>
        <div className={styles.HeaderActions}>
          <LanguageSelector />
          <AddTransactionButton
            userId={userId}
            onSuccess={fetchAllTransactions}
          />
        </div>
      </div>
      {renderTabs()}
    </div>
  );

  const renderTransactionTable = () => (
    <div className={styles.UserCard}>
      <div className={styles.UserScrollContainer}>
        <TransactionTable
          transactions={store.filteredTransactions.map((tx) => ({
            id: tx.id,
            userId: userId,
            description: tx.name,
            category: tx.category || "General",
            timestamp: tx.date,
            amount: tx.amount * (tx.type === 'debit' ? -1 : 1),
          }))}
          onDeleteSuccess={fetchAllTransactions}
          onUpdateSuccess={fetchAllTransactions}
          showHeader={true}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderContent = () => (
    <div className={styles.UserInnerContainer}>
      {renderTransactionTable()}
    </div>
  );

  // ===== Main Render ===== //
  
  if (store.isLoading && store.transactions.length === 0) return renderLoading();
  if (store.error) return renderError();

  return (
    <div className={styles.UserOuterContainer}>
      {renderHeader()}
      {renderContent()}
    </div>
  );
});

export default UserTransactionsPage;
