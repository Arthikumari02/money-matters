import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import {
  TransactionModel,
  TransactionType,
} from '../../models/TransactionModel';

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

const getAuthHeaders = (userId: string | null) => ({
  'Content-Type': 'application/json',
  'x-hasura-admin-secret':
    'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
  'x-hasura-role': 'user',
  ...(userId ? { 'x-hasura-user-id': userId } : {}),
});

export const useUserTransactionsApi = (userId: string | null) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 16;

  const fetchTransactions = useCallback(
    async (type: 'all' | 'credit' | 'debit' = 'all', reset = false) => {
      if (!userId || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const headers = getAuthHeaders(userId);
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
        } else {
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
    [userId, offset, isLoading]
  );

  useEffect(() => {
    if (userId) {
      setOffset(0);
      fetchTransactions('all', true);
    }
  }, [userId]);

  const testTransactionConnection = async (transactionId: string) => {
    try {
      const testUrl = `${API_BASE_URL}/transaction/${transactionId}`;
      console.log('Testing connection to:', testUrl);

      const headers = {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId || '',
      };

      const response = await axios.get(testUrl, { headers });
      console.log('Test response:', {
        status: response.status,
        data: response.data,
      });
      return response.data;
    } catch (error) {
      console.error('Test connection failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        isAxiosError: axios.isAxiosError(error),
        status: (error as any)?.response?.status,
        data: (error as any)?.response?.data,
      });
      throw error;
    }
  };

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    fetchTransactions,
    testTransactionConnection,
    deleteTransaction: async (id: string): Promise<boolean> => {
      console.log('Attempting to delete transaction with ID:', id);
      console.log(
        'Available transaction IDs:',
        transactions.map((tx) => tx.id)
      );

      if (!userId) {
        console.error('Delete failed: User not authenticated');
        throw new Error('User not authenticated');
      }

      try {
        const deleteUrl = `${API_BASE_URL}/delete-transaction/${id}`;
        console.log('Sending DELETE request to:', deleteUrl);

        const headers = {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        };

        console.log('Request headers:', JSON.stringify(headers, null, 2));

        const response = await axios.delete(deleteUrl, {
          headers,
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        });

        console.log('Delete response:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          headers: response.headers,
        });

        if (response.status === 200 || response.status === 204) {
          console.log('Delete successful, updating UI');
          setTransactions((prev) => prev.filter((tx) => tx.id !== id));
          return true;
        }

        // Handle specific error cases
        let errorMessage = 'Failed to delete transaction';
        if (response.status === 404) {
          errorMessage = 'Transaction not found or already deleted';
        } else if (response.status === 403) {
          errorMessage =
            'You do not have permission to delete this transaction';
        } else if (response.data?.error) {
          errorMessage = response.data.error;
        } else if (response.data?.message) {
          errorMessage = response.data.message;
        }

        console.error(
          'Delete failed with status',
          response.status,
          ':',
          errorMessage
        );
        throw new Error(errorMessage);
      } catch (error) {
        console.error('Error in deleteTransaction:', {
          error,
          isAxiosError: axios.isAxiosError(error),
          status: (error as any)?.response?.status,
          data: (error as any)?.response?.data,
          config: {
            url: (error as any)?.config?.url,
            method: (error as any)?.config?.method,
            headers: (error as any)?.config?.headers,
          },
        });

        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;
          const errorMessage =
            errorData?.error ||
            errorData?.message ||
            error.message ||
            'Failed to delete transaction. Please try again.';
          throw new Error(errorMessage);
        }

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        throw new Error(`Failed to delete transaction: ${errorMessage}`);
      }
    },
  };
};
