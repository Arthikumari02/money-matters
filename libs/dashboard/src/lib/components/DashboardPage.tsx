import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';
import { useFetchDashboard } from '../hooks/apis/FetchDashboard/useFetchDashboard';
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
import { useCallback } from 'react';
import * as styles from './Style';
import { useDashboardRefresh, formatTransaction } from '../utils/dashboardUtils';


const DashboardPage: React.FC = observer(() => {
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();
  const { t } = useTranslation('dashboard');
  const isAdmin = !!authStore.isAdmin;

  const { fetchDashboard, isFetching } = useFetchDashboard(dashboardStore);
  const { onDeleteSuccess, onUpdateSuccess } = useDashboardRefresh({
    onSuccess: () => console.log('Dashboard data refreshed successfully'),
    onError: (err) => console.error('Failed to refresh dashboard:', err),
  });

  useEffect(() => {
    dashboardStore.setIsAdmin(isAdmin);

    if (!isAdmin && authStore.userInfo?.id) {
      dashboardStore.setUserId(authStore.userInfo.id);
    }

    fetchDashboard({
      onSuccess: () => console.log('Dashboard data fetched successfully'),
      onError: (err) => console.error('Failed to fetch dashboard:', err),
    });
  }, [isAdmin, authStore.userInfo?.id, fetchDashboard, dashboardStore]);

  const credit = dashboardStore.totals?.credit || 0;
  const debit = dashboardStore.totals?.debit || 0;

  const handleOnSuccess = useCallback(() => {
    setTimeout(() => {
      fetchDashboard({
        onSuccess: () => console.log('Dashboard reloaded after add'),
        onError: (err) => console.error('Reload failed:', err),
      });
    }, 1000);
  }, [fetchDashboard]);


  const renderHeader = () => (
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
  )

  const renderTotalCreditsAndDebits = () => (
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
  )

  const renderLastTransactions = () => (
    <div className={styles.LastTransactionsContainer}>
      <h2 className={styles.LastTransactionsTitle}>
        {t('last_transaction')}
      </h2>
      <TransactionTable
        className={styles.LastTransactionsContent}
        transactions={(dashboardStore.recentTransactions || [])
          .slice(0, 5)
          .map(formatTransaction)}
        showPagination={false}
        showHeader={false}
        onDeleteSuccess={onDeleteSuccess}
        onUpdateSuccess={onUpdateSuccess}
      />
    </div>
  )

  const renderDebitCreditOverview = () => (
    <div className={styles.DebitCreditOverviewContainer}>
      <h2 className={styles.SubHeader}>
        {t('debit_and_credit_overview')}
      </h2>
      <DebitCreditChart />
    </div>
  )

  return (
    <div className={styles.MainPageContainer}>
      {isFetching && !dashboardStore.recentTransactions?.length ? (
        <PageLoader />
      ) : dashboardStore.error ? (
        <PageError error={dashboardStore.error} />
      ) : (
        <div className={styles.MainContainer}>
          {renderHeader()}

          <div className={styles.ContentContainer}>
            {renderTotalCreditsAndDebits()}

            {renderLastTransactions()}

            {renderDebitCreditOverview()}
          </div>
        </div>
      )}
    </div>
  );
});


export default DashboardPage;
