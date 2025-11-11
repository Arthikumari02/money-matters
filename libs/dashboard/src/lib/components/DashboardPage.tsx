import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';
import { useFetchDashboard } from '../hooks/apis/useFetchDashboard';
import {
  AddTransactionButton,
  TotalCreditsAndDebits,
  TransactionTable,
  LanguageSelector,
  PageLoader,
  PageError,
} from '@money-matters/ui';
import totalCredit from '../../assets/totalcredit.png';
import totalDebit from '../../assets/totaldebits.png';
import { DebitCreditChart } from './DebitCreditOverview';
import { useTranslation } from 'react-i18next';
import * as styles from './Style';


const DashboardPage: React.FC = observer(() => {
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();
  const { t } = useTranslation('dashboard');

  const { fetchDashboard, isFetching } = useFetchDashboard(dashboardStore);
  const isAdmin = !!authStore.isAdmin;

  useEffect(() => {
    const isStorybook =
      typeof window !== 'undefined' &&
      (window.location.href.includes('iframe.html') ||
        (window as any).__STORYBOOK_ADDONS_CHANNEL__);

    if (isStorybook) {
      return;
    }

    dashboardStore.setIsAdmin(isAdmin);

    if (!isAdmin && authStore.userInfo?.id) {
      dashboardStore.setUserId(authStore.userInfo.id);
    }

    fetchDashboard({
      onSuccess: () => console.log('Dashboard data fetched successfully'),
      onError: (err) => console.error('Failed to fetch dashboard:', err),
    });
  }, [isAdmin, authStore.userInfo?.id]);

  if (isFetching && !dashboardStore.recentTransactions?.length) {
    return <PageLoader />;
  }

  if (dashboardStore.error) {
    return <PageError error={dashboardStore.error} />;
  }

  const credit = dashboardStore.totals?.credit || 0;
  const debit = dashboardStore.totals?.debit || 0;
  const handleOnSuccess = () => {
    setTimeout(() => {
      fetchDashboard({
        onSuccess: () => console.log('Dashboard reloaded after add'),
        onError: (err) => console.error('Reload failed:', err),
      });
    }, 1000);

  }
  return (
    <div className={styles.MainContainer}>
      <div className="flex-1">
        <div className={styles.Header}>
          <h1 className={styles.Title}>{t('accounts')}</h1>
          <div className={styles.LanguageSelectorContainer}>
            <LanguageSelector />
            {!isAdmin && (
              <AddTransactionButton
                userId={authStore.userInfo?.id ?? ''}
                onSuccess={handleOnSuccess}
              />
            )}
          </div>
        </div>

        <div className={styles.ContentContainer}>
          <div className={styles.GridContainer}>
            <TotalCreditsAndDebits
              amount={`${credit.toLocaleString()}`}
              isCredit={true}
              imagePath={totalCredit}
            />
            <TotalCreditsAndDebits
              amount={`${debit.toLocaleString()}`}
              isCredit={false}
              imagePath={totalDebit}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              {t('last_transaction')}
            </h2>
            <TransactionTable className={styles.ContainerOfLastTransaction}
              transactions={
                (dashboardStore.recentTransactions || []).slice(0, 5).map((tx: any) => ({
                  id: tx.id,
                  userId: tx.user_id,
                  description: tx.transaction_name || tx.name || 'No description',
                  category: tx.category || 'Uncategorized',
                  timestamp: tx.date || tx.timestamp || new Date().toISOString(),
                  amount: tx.amount ? Number(tx.amount) : 0,
                  userName: tx.user_name || tx.userName || 'Unknown User',
                  userAvatar: tx.user_avatar,
                }))
              }
              showPagination={false}
              showHeader={false}
              onDeleteSuccess={() =>
                fetchDashboard({
                  onSuccess: () =>
                    console.log('Dashboard data refreshed after delete'),
                  onError: (err) =>
                    console.error('Failed to refresh dashboard:', err),
                })
              }
              onUpdateSuccess={() =>
                fetchDashboard({
                  onSuccess: () =>
                    console.log('Dashboard data refreshed after update'),
                  onError: (err) =>
                    console.error('Failed to refresh dashboard:', err),
                })
              }
            />
          </div>

          <div className={styles.DebitCreditOverviewContainer}>
            <h2 className={styles.SubHeader}>
              {t('debit_and_credit_overview')}
            </h2>
            <DebitCreditChart />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DashboardPage;
