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

const DashboardPage: React.FC = observer(() => {
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();
  const { t } = useTranslation('dashboard');

  const { fetchDashboard, isFetching } = useFetchDashboard(dashboardStore);
  const isAdmin = !!authStore.isAdmin;

  useEffect(() => {
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
    <div className="min-h-screen flex">
      <main className="flex-1">
        <div className="flex items-center justify-between mb-6 bg-white p-5">
          <h1 className="text-2xl font-bold text-gray-800">{t('accounts')}</h1>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <AddTransactionButton
              userId={authStore.userInfo?.id ?? ''}
              onSuccess={() =>
                fetchDashboard({
                  onSuccess: () => console.log('Refetched dashboard after add'),
                  onError: (err) => console.error('Refetch failed:', err),
                })
              }
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
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

          <div className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {t('last_transaction')}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-6  space-y-3">
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
                      setTimeout(() => {
                        fetchDashboard({
                          onSuccess: () => console.log('Refetched dashboard after update'),
                          onError: (err) => console.error('Refetch failed:', err),
                        });
                      }, 1000)
                    }
                  />
                )
              )}
            </div>
          </div>

          <div className="p-6 m-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {t('debit_and_credit_overview')}
              </h2>
            </div>

            <div className="bg-white rounded-lg p-4 h-72 w-full">
              {dashboardStore.chartData.length > 0 ? (
                <div className="w-full h-full">
                  <DebitCreditChart />
                </div>
              ) : (
                <p className="text-gray-400 flex items-center justify-center h-full">
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
