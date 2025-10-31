import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { TransactionModel, TransactionType } from '../../models/TransactionModel';

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-hasura-admin-secret':
    'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
  'x-hasura-role': 'admin',
});

export const useAdminTransactionsApi = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 16;

  const fetchTransactions = useCallback(
    async (type: 'all' | 'credit' | 'debit' = 'all', reset = false) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const headers = getAuthHeaders();
        let fetchedData: any[] = [];

        if (type === 'all') {
          const currentOffset = reset ? 0 : offset;
          const params = { limit: LIMIT, offset: currentOffset };

          const response = await axios.get(`${API_BASE_URL}/all-transactions`, {
            headers,
            params,
          });

          fetchedData =
            response.data.transactions || response.data.all_transactions || [];

          const newTransactions: TransactionModel[] = fetchedData.map(
            (tx: any) =>
              new TransactionModel({
                id: tx.id,
                name: tx.transaction_name ?? 'Unnamed Transaction',
                amount: parseFloat(tx.amount ?? 0),
                type: (tx.type ?? 'debit').toLowerCase() as TransactionType,
                category: tx.category ?? 'Uncategorized',
                userId: tx.user_id,
                userName: tx.user_name ?? 'Unknown User',
                date: tx.date,
                createdAt: tx.created_at,
                updatedAt: tx.updated_at,
                userAvatar: tx.userAvatar,
              })
          );

          setTransactions((prev) =>
            reset ? newTransactions : [...prev, ...newTransactions]
          );
          setOffset((prev) => (reset ? LIMIT : prev + LIMIT));
          setHasMore(newTransactions.length === LIMIT);
        }
        else {
          const response = await axios.get(`${API_BASE_URL}/all-transactions`, {
            headers,
            params: { limit: 1000, offset: 0 },
          });

          fetchedData =
            response.data.transactions || response.data.all_transactions || [];

          const filteredData = fetchedData.filter(
            (tx) => (tx.type ?? '').toLowerCase() === type
          );

          const newTransactions: TransactionModel[] = filteredData.map(
            (tx: any) =>
              new TransactionModel({
                id: tx.id,
                name: tx.transaction_name ?? 'Unnamed Transaction',
                amount: parseFloat(tx.amount ?? 0),
                type: (tx.type ?? 'debit').toLowerCase() as TransactionType,
                category: tx.category ?? 'Uncategorized',
                userId: tx.user_id,
                userName: tx.user_name ?? 'Unknown User',
                date: tx.date,
                createdAt: tx.created_at,
                updatedAt: tx.updated_at,
                userAvatar: tx.userAvatar,
              })
          );

          setTransactions(newTransactions);
          setHasMore(false);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        console.error('Error fetching user transactions:', axiosError);
        setError('Failed to load transactions.');
      } finally {
        setIsLoading(false);
      }
    },
    [offset, isLoading]
  );

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    fetchTransactions,
    setOffset,
  };
};
