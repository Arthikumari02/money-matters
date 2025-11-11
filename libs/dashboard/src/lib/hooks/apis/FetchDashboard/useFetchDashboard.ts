import { useCallback, useState } from 'react';
import { DashboardStore } from '../../../stores/DashboardStore';
import processDashboardData from './useResponseDashboard';
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
            `${BASE_URL}/${isAdmin ? 'transaction-totals-admin' : 'credit-debit-totals'}`,
            { headers }
          ),
          fetch(`${BASE_URL}/all-transactions?limit=1000&offset=0`, { headers }),
          fetch(
            `${BASE_URL}/${isAdmin ? 'daywise-totals-last-7-days-admin' : 'daywise-totals-7-days'}`,
            { headers }
          ),
        ]);

        await processDashboardData(totalsRes, transactionsRes, dailyTotalsRes, isAdmin, store, options);
      } catch (err: any) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load dashboard';
        store.setError(errorMsg);
        options?.onError?.(errorMsg);
        throw err;
      } finally {
        setIsFetching(false);
        store.setLoading(false);
      }
    },
    [store]
  );

  return { fetchDashboard, isFetching };
};
