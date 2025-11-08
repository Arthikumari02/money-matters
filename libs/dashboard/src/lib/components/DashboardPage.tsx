import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';
import { useFetchDashboard } from '../hooks/apis/useFetchDashboard';
import {
  AddTransactionButton,
  TotalCreditsAndDebits,
  TransactionItemAdmin,
  TransactionItemUser,
  LanguageSelector,
  PageLoader,
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
    if (typeof window !== 'undefined' && (window as any).__STORYBOOK_ADDONS_CHANNEL__) {
      console.log('Skipping dashboard fetch in Storybook');
      return;
    }

    dashboardStore.setIsAdmin(isAdmin);

    if (!isAdmin && authStore.userInfo?.id) {
      dashboardStore.setUserId(authStore.userInfo.id);
    }

    fetchDashboard({
      onSuccess: () => console.log('Dashboard loaded successfully'),
      onError: (err) => console.error('Dashboard load failed:', err),
    });
  }, [isAdmin, authStore.userInfo?.id]);


  const loading =
    dashboardStore.isLoading ||
    isFetching ||
    dashboardStore.recentTransactions.length === 0;

  if (loading) {
    return <PageLoader />;
  }

  const credit = dashboardStore.totals?.credit || 0;
  const debit = dashboardStore.totals?.debit || 0;

  return (
    <div className={styles.MainContainer}>
      <main className="flex-1">
        <div className={styles.Header}>
          <h1 className={styles.Title}>{t('accounts')}</h1>
          <div className={styles.LanguageSelectorContainer}>
            <LanguageSelector />
            <AddTransactionButton
              userId={authStore.userInfo?.id ?? ''}
              onSuccess={() => {
                setTimeout(() => {
                  fetchDashboard({
                    onSuccess: () => console.log('Dashboard reloaded after add'),
                    onError: (err) => console.error('Reload failed:', err),
                  });
                }, 1000);
              }}
            />
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

          <div className={styles.MainContainerOfLastTransaction}>
            <h2 className={styles.SubHeader}>
              {t('last_transaction')}
            </h2>

            <div className={styles.ContainerOfLastTransaction}>
              {dashboardStore.recentTransactions.map((txn) =>
                isAdmin ? (
                  <TransactionItemAdmin
                    key={txn.id}
                    transaction={{
                      id: txn.id,
                      name: txn.transaction_name || 'No description',
                      userName: txn.user_id || 'Unknown User',
                      category: txn.category || 'Uncategorized',
                      type: txn.type === 'credit' ? 'credit' : 'debit',
                      amount: txn.amount || 0,
                      date: txn.date || new Date().toISOString(),
                      userAvatar: txn.avatarUrl,
                    }}
                  />
                ) : (
                  <TransactionItemUser
                    key={txn.id}
                    id={txn.id}
                    userId={authStore.userInfo?.id ?? ''}
                    description={txn.transaction_name || 'No description'}
                    category={txn.category || 'Uncategorized'}
                    timestamp={txn.date || new Date().toISOString()}
                    amount={
                      (txn.type === 'debit' ? '-' : '+') +
                      (txn.amount || 0).toLocaleString()
                    }
                    onDeleteSuccess={() =>
                      fetchDashboard({
                        onSuccess: () =>
                          console.log('Refetched dashboard after delete'),
                        onError: (err) => console.error('Refetch failed:', err),
                      })
                    }
                    onUpdateSuccess={() =>
                      fetchDashboard({
                        onSuccess: () => console.log('Refetched dashboard after update'),
                        onError: (err) => console.error('Refetch failed:', err),
                      })
                    }
                  />
                )
              )}
            </div>
          </div>

          <div className={styles.DebitCreditOverviewContainer}>
            <h2 className={styles.SubHeader}>
              {t('debit_and_credit_overview')}
            </h2>

            <div className={styles.DebitCreditOverviewChartContainer}>
              {dashboardStore.chartData.length > 0 ? (
                <div className={styles.DebitCreditOverviewChart
                }>
                  <DebitCreditChart />
                </div>
              ) : (
                <p className={styles.DebitCreditOverviewChartContainer}>
                  No data available for last 7 days
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
});

export default DashboardPage;
