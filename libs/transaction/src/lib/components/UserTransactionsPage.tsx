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

const UserTransactionsPage: React.FC = observer(() => {
  const authStore = useAuthStore();
  const userId = authStore.userInfo?.id || "";
  const { store, fetchAllTransactions } = useUserTransactionsApi(userId);
  const { t } = useTranslation("transaction");

  if (store.isLoading && store.transactions.length === 0) return <PageLoader />;
  if (store.error)
    return (
      <div className="p-4">
        <PageError error={store.error} />
      </div>
    );

  return (
    <div className={styles.PageContainer}>
      <div className={styles.HeaderContainer}>
        <div className={styles.HeaderFlex}>
          <h1 className={styles.HeaderTitle}>{t("transactions_heading")}</h1>
          <div className={styles.HeaderActions}>
            <LanguageSelector />
            <AddTransactionButton
              userId={userId}
              onSuccess={() => fetchAllTransactions()}
            />
          </div>
        </div>

        <nav className={styles.TabsContainer}>
          {[
            { id: "all" as const, label: t("tab.all_transactions") },
            { id: "debit" as const, label: t("tab.debit") },
            { id: "credit" as const, label: t("tab.credit") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => store.setActiveTab(tab.id)}
              className={`${styles.TabButtonBase} ${store.activeTab === tab.id ? styles.TabActive : styles.TabInactive
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.UserCardContainer}>
        <div className={styles.UserScrollContainer}>
          <TransactionTable
            transactions={store.filteredTransactions.map((tx) => ({
              id: tx.id,
              userId: userId,
              description: tx.name,
              category: tx.category || 'General',
              timestamp: tx.date,
              amount: tx.amount,
            }))}
            onDeleteSuccess={() => fetchAllTransactions()}
            onUpdateSuccess={() => fetchAllTransactions()}
            showHeader={false}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
});

export default UserTransactionsPage;
