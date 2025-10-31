import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';
import {
  AddTransactionButton,
  TotalCreditsAndDebits,
  TransactionItemAdmin,
  TransactionItemUser,
} from '@money-matters/ui';
import totalCredit from '../../assests/totalcredit.png';
import totalDebit from '../../assests/totaldebits.png';

const DashboardPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();

  const isAdmin = !!authStore.isAdmin;

  useEffect(() => {
    const initDashboard = async () => {
      try {
        dashboardStore.setIsAdmin(isAdmin);

        if (!isAdmin && authStore.userInfo?.id) {
          dashboardStore.setUserId(authStore.userInfo.id);
        }

        await Promise.all([
          dashboardStore.loadTotals(),
          dashboardStore.loadRecentTransactions(),
          dashboardStore.loadDailyTotals(),
        ]);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      }
    };

    initDashboard();
  }, [isAdmin, authStore.userInfo?.id, dashboardStore]);

  if (
    dashboardStore.isLoading &&
    dashboardStore.recentTransactions.length === 0
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e6f4d9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <AddTransactionButton onclick={() => navigate('/add-transaction')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Last Transactions
            </h2>
          </div>

          <div className="space-y-3">
            {dashboardStore.recentTransactions.map((txn) =>
              isAdmin ? (
                <TransactionItemAdmin
                  key={txn.id}
                  transaction={{
                    id: txn.id,
                    name: txn.description || 'No description',
                    userName: txn.userName || 'Unknown User',
                    category: txn.category || 'Uncategorized',
                    type: txn.direction === 'credit' ? 'credit' : 'debit',
                    amount: txn.amount || 0,
                    date: txn.timestamp || new Date().toISOString(),
                    userAvatar: txn.avatarUrl,
                  }}
                />
              ) : (
                <TransactionItemUser
                  key={txn.id}
                  description={txn.description || 'No description'}
                  category={txn.category || 'Uncategorized'}
                  timestamp={txn.timestamp || new Date().toISOString()}
                  amount={
                    (txn.direction === 'debit' ? '-' : '+') +
                    '$' +
                    (txn.amount || 0).toLocaleString()
                  }
                  onEdit={() => navigate(`/transactions/edit/${txn.id}`)}
                  onDelete={() => console.log('Delete:', txn.id)}
                  onClick={() => navigate(`/transactions/${txn.id}`)}
                />
              )
            )}
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Debit & Credit Overview
            </h2>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>
      </main>
    </div>
  );
});

export default DashboardPage;
