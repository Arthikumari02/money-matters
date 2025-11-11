import { ApiError, withErrorHandling } from '../utils/errorHandler';

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';
const ADMIN_SECRET =
  'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF';

const handleApiResponse = async (response: Response, context: string) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new ApiError(
      errorData.message || 'Request failed',
      response.status,
      errorData
    );
  }
  return response.json();
};

export interface Transaction {
  id: string;
  name: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionInput {
  name: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
  date: string;
}

export const addTransaction = async (userId: string, data: TransactionInput) => {
  const response = await withErrorHandling(
    async () => {
      const res = await fetch(`${API_BASE_URL}/add-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': ADMIN_SECRET,
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
        body: JSON.stringify({
          user_id: userId,
          name: data.name,
          type: data.type,
          category: data.category,
          amount: data.amount,
          date: data.date,
        }),
      });
      return handleApiResponse(res, 'addTransaction');
    },
    'Failed to add transaction'
  );
  
  if (response.error) throw response.error;
  return response.data;
};

export const updateTransaction = async (
  userId: string,
  transactionId: string,
  data: {
    name: string;
    type: string;
    category: string;
    amount: number;
    date: string;
  }
) => {
  const response = await withErrorHandling(
    async () => {
      const res = await fetch(`${API_BASE_URL}/update-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': ADMIN_SECRET,
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
        body: JSON.stringify({
          id: transactionId,
          name: data.name,
          type: data.type,
          category: data.category,
          amount: data.amount,
          date: data.date,
        }),
      });
      return handleApiResponse(res, 'updateTransaction');
    },
    'Failed to update transaction'
  );

  if (response.error) throw response.error;
  return response.data;
};

export const deleteTransaction = async ({
  transactionId,
  userId,
}: {
  transactionId: string;
  userId: string;
}): Promise<void> => {
  const response = await withErrorHandling(
    async () => {
      const res = await fetch(
        `${API_BASE_URL}/delete-transaction?id=${transactionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': ADMIN_SECRET,
            'x-hasura-role': 'user',
            'x-hasura-user-id': userId,
          },
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new ApiError(
          errorData.error || 'Failed to delete transaction',
          res.status,
          errorData
        );
      }
      
      return res.json();
    },
    'Failed to delete transaction'
  );

  if (response.error) throw response.error;
};
