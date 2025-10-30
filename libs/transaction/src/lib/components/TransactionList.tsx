import React from 'react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  userId: string;
  userName?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdminView?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  isAdminView = false,
}) => {
  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {isAdminView && (
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                User
              </th>
            )}
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Amount
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            {!isAdminView && (
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              {isAdminView && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {transaction.userName || `User ${transaction.userId}`}
                </td>
              )}
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {transaction.description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              {!isAdminView && (
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => onEdit?.(transaction.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(transaction.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
