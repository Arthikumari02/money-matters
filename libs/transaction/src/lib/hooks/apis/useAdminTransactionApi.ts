import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import {
  TransactionModel,
  TransactionType,
} from '../../models/TransactionModel';

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');

  return {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': `Bearer ${token}`,
  };
};

export const useAdminTransactionsApi = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const fetchTransactions = useCallback(
    async (type: TransactionType | 'all' = 'all', reset = false) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        const headers = getAuthHeaders();
        const params: any = { limit: LIMIT, offset: reset ? 0 : offset };
        if (type !== 'all') params.type = type;

        const response = await axios.get(`${API_BASE_URL}/all-transactions`, {
          headers,
          params,
        });

        const newTransactions: TransactionModel[] =
          response.data.all_transactions.map(
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

        setOffset(reset ? LIMIT : offset + LIMIT);
        setHasMore(newTransactions.length === LIMIT);
      } catch (err) {
        const axiosError = err as AxiosError;
        console.error('Error fetching admin transactions:', axiosError);

        if (axiosError.response?.status === 401) {
          setError('Unauthorized: Invalid or missing credentials.');
        } else {
          setError('Failed to load transactions. Please try again.');
        }
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
