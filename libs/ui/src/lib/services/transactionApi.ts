const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';
const ADMIN_SECRET =
  'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF';

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

export const addTransaction = async (
  userId: string,
  data: TransactionInput
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
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

    if (!response.ok) {
      const error = await response.json();
      console.error('Error response:', error);
      throw new Error(
        error.message || error.error || 'Failed to add transaction'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
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
  try {
    const response = await fetch(
      'https://bursting-gelding-24.hasura.app/api/rest/update-transaction',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
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
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async ({
  transactionId,
  userId,
}: {
  transactionId: string;
  userId: string;
}): Promise<void> => {
  try {
    console.log('Sending delete request for transaction:', {
      transactionId,
      userId,
    });

    const response = await fetch(
      `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=${transactionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':
            'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.error || 'Failed to delete transaction');
    }
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    throw error;
  }
};
