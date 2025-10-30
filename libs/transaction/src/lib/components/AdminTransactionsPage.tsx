import React, { useState, useEffect } from 'react';
import TransactionList, { Transaction } from './TransactionList';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Grocery shopping',
    amount: 125.75,
    date: '2023-05-15T10:30:00Z',
    userId: '1',
    userName: 'Jane Doe',
  },
  {
    id: '2',
    description: 'Electric bill',
    amount: 85.2,
    date: '2023-05-10T14:45:00Z',
    userId: '1',
    userName: 'Jane Doe',
  },
  {
    id: '3',
    description: 'Internet bill',
    amount: 65.99,
    date: '2023-05-12T09:15:00Z',
    userId: '2',
    userName: 'John Smith',
  },
];

const AdminTransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');

  const users = Array.from(new Set(mockTransactions.map((t) => t.userId))).map(
    (id) => ({
      id,
      name:
        mockTransactions.find((t) => t.userId === id)?.userName || `User ${id}`,
    })
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesUser =
      selectedUser === 'all' || transaction.userId === selectedUser;

    return matchesSearch && matchesUser;
  });

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
          <h1 className="text-2xl font-semibold text-gray-900">
            All Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all user transactions.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search transactions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <label htmlFor="user-filter" className="sr-only">
            Filter by user
          </label>
          <select
            id="user-filter"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="all">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <TransactionList
          transactions={filteredTransactions}
          isAdminView={true}
        />
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
