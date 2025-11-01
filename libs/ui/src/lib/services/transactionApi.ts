
const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

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

interface DeleteTransactionParams {
  transactionId: string;
  userId: string;
}

export const addTransaction = async (userId: string, transaction: TransactionInput): Promise<Transaction> => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
      body: JSON.stringify({
        ...transaction,
        amount: transaction.type === 'debit' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add transaction');
    }

    const result = await response.json();
    return {
      ...result,
      id: result.id || Date.now().toString(),
      userId,
      createdAt: result.createdAt || new Date().toISOString(),
      updatedAt: result.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (
  userId: string,
  transactionId: string,
  updates: Partial<TransactionInput>
): Promise<Transaction> => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-transaction/${transactionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update transaction');
    }

    const result = await response.json();
    return {
      ...result,
      id: transactionId,
      userId,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};


export const deleteTransaction = async ({ 
  transactionId, 
  userId 
}: DeleteTransactionParams): Promise<void> => {
  try {
    console.log('Sending delete request for transaction:', { transactionId, userId });
    const response = await fetch(`${API_BASE_URL}/delete-transaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': userId,
      },
    });

    console.log('Delete response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch (e) {
        const text = await response.text();
        console.error('Failed to parse error response:', text);
        errorMessage = text || 'Unknown error occurred';
      }
      throw new Error(`Failed to delete transaction: ${errorMessage}`);
    }
    
    console.log('Successfully deleted transaction:', transactionId);
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    throw error;
  }
};
