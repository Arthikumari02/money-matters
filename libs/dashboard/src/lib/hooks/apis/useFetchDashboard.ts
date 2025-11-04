import { useCallback, useState } from 'react';
import { DashboardStore } from '../../stores/DashboardStore';

interface FetchDashboardOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useFetchDashboard = (store: DashboardStore) => {
  const [isFetching, setIsFetching] = useState(false);

  const fetchDashboard = useCallback(
    async (options?: FetchDashboardOptions) => {
      const { isAdmin, userId } = store;
      if (!isAdmin && !userId) {
        console.error('Missing user ID for non-admin');
        return;
      }

      setIsFetching(true);
      store.setLoading(true);
      store.setError(null);

      try {
        const BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': isAdmin ? 'admin' : 'user',
        };
        if (!isAdmin && userId) headers['x-hasura-user-id'] = String(userId);

        const [totalsRes, transactionsRes, dailyTotalsRes] = await Promise.all([
          fetch(
            `${BASE_URL}/${
              isAdmin ? 'transaction-totals-admin' : 'credit-debit-totals'
            }`,
            { headers }
          ),
          fetch(`${BASE_URL}/all-transactions?limit=3&offset=0`, { headers }),
          fetch(
            `${BASE_URL}/${
              isAdmin
                ? 'daywise-totals-last-7-days-admin'
                : 'daywise-totals-7-days'
            }`,
            { headers }
          ),
        ]);

        if (!totalsRes.ok || !transactionsRes.ok || !dailyTotalsRes.ok)
          throw new Error('Failed to fetch dashboard data');

        const totalsData = await totalsRes.json();
        const transactionsData = await transactionsRes.json();
        const dailyTotalsData = await dailyTotalsRes.json();

        const totals =
          (isAdmin
            ? totalsData.transaction_totals_admin
            : totalsData.totals_credit_debit_transactions) || [];

        store.setTotals({
          credit: totals.find((t: any) => t.type === 'credit')?.sum || 0,
          debit: totals.find((t: any) => t.type === 'debit')?.sum || 0,
        });

        const sortedTxns = (transactionsData.transactions || []).sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        store.setRecentTransactions(sortedTxns.slice(0, 3));

        const allDays =
          dailyTotalsData.last_7_days_transactions_credit_debit_totals || [];

        const grouped = allDays.reduce((acc: any, item: any) => {
          const day = new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'short',
          });

          if (!acc[day]) acc[day] = { day, credit: 0, debit: 0 };

          if (item.type.toLowerCase() === 'credit') acc[day].credit = item.sum;
          else if (item.type.toLowerCase() === 'debit')
            acc[day].debit = item.sum;

          return acc;
        }, {});

        const now = new Date();
        const last7Days: { day: string; credit: number; debit: number }[] = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });

          last7Days.push(grouped[day] || { day, credit: 0, debit: 0 });
        }

        store.setChartData(last7Days);

        options?.onSuccess?.();
      } catch (err: any) {
        const errorMsg = err.message || 'Failed to load dashboard';
        store.setError(errorMsg);
        options?.onError?.(errorMsg);
      } finally {
        setIsFetching(false);
        store.setLoading(false);
      }
    },
    [store]
  );

  return { fetchDashboard, isFetching };
};
