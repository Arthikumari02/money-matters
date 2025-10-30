import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@money-matters/auth';
import TransactionList from './TransactionList';
import { Transaction } from './TransactionList';

// Mock data - replace with actual API calls
const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Grocery shopping',
    amount: 125.75,
    date: '2023-05-15T10:30:00Z',
    userId: '1',
  },
  {
    id: '2',
    description: 'Electric bill',
    amount: 85.20,
    date: '2023-05-10T14:45:00Z',
    userId: '1',
  },
];

const UserTransactionsPage: React.FC = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    const fetchTransactions = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // Filter transactions for current user
        const userTransactions = mockTransactions.filter(
          t => t.userId === authStore.userInfo?.id
        );
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [authStore.userInfo?.id]);

  const handleEdit = (id: string) => {
    // Navigate to edit page
    navigate(`/transactions/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 300));
        setTransactions(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Your Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your transactions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate('/transactions/new')}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add transaction
          </button>
        </div>
      </div>
      <div className="mt-8">
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdminView={false}
        />
      </div>
    </div>
  );
};

export default UserTransactionsPage;
