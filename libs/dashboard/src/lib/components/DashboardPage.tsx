import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';
import { AddTransactionButton, TotalCreditsAndDebits, TransactionItemAdmin, TransactionItemUser } from '@money-matters/ui';
import totalCredit from '../../assests/totalcredit.png'
import totalDebit from '../../assests/totaldebits.png'

const DashboardPage: React.FC = observer(() => {
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();

  const isAdmin = !!authStore.isAdmin;
  const userId = isAdmin ? undefined : authStore.userInfo?.id;

  useEffect(() => {
    const initDashboard = async () => {
      try {
        dashboardStore.setIsAdmin(isAdmin);
        if (!isAdmin && authStore.userInfo?.id) {
          dashboardStore.setUserId(authStore.userInfo.id);
        }

        // Load data in parallel
        await Promise.all([
          dashboardStore.loadTotals(),
          dashboardStore.loadRecentTransactions(),
          dashboardStore.loadDailyTotals()
        ]);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      }
    };

    initDashboard();
  }, [isAdmin, authStore.userInfo?.id, dashboardStore]);

  if (dashboardStore.isLoading && dashboardStore.recentTransactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e6f4d9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6f4d9] flex">
      <main className="flex-1 bg-[#f4f6fc] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">{isAdmin ? 'Admin Dashboard' : 'Dashboard'}</h2>
          <div className='h-5 w-10'>
            <AddTransactionButton onclick={() => {/* ... */ }} />
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          <TotalCreditsAndDebits
            amount={dashboardStore.totals.credit.toLocaleString()}
            isCredit={true}
            imagePath={totalCredit}
          />
          <TotalCreditsAndDebits
            amount={dashboardStore.totals.debit.toLocaleString()}
            isCredit={false}
            imagePath={totalDebit}
          />
        </div>
        <div className="bg-white rounded-2xl p-4 mb-6 shadow">
          <div className="font-medium text-gray-700 mb-4">Last Transaction</div>
          <div className="flex flex-col gap-2">
            {dashboardStore.recentTransactions.map(txn => (
              isAdmin ? (
                <TransactionItemAdmin
                  key={txn.id}
                  avatarUrl={txn.avatarUrl}
                  direction={txn.direction}
                  name={txn.userName}
                  description={txn.description}
                  category={txn.category}
                  timestamp={txn.timestamp}
                  amount={
                    (txn.direction === 'debit' ? '-' : '+') +
                    '$' +
                    (txn.amount || 0).toLocaleString()
                  }
                />
              ) : (
                <TransactionItemUser
                  key={txn.id}
                  description={txn.description}
                  category={txn.category}
                  timestamp={txn.timestamp}
                  amount={
                    (txn.direction === 'debit' ? '-' : '+') +
                    '$' +
                    (txn.amount || 0).toLocaleString()
                  }
                  onEdit={() => console.log('Edit:', txn.id)}
                  onDelete={() => console.log('Delete:', txn.id)}
                />
              )
            ))}
          </div>
        </div>
        {/* Debit & Credit Overview Section */}
        <div className="bg-white rounded-2xl p-4">
          <div className="font-medium text-gray-700 mb-2">Debit & Credit Overview</div>
          {/* Bar chart to be added here */}
        </div>
      </main>
    </div>
  );
});

export default DashboardPage;
