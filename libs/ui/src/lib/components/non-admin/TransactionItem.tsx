import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

interface TransactionRowProps {
  description: string;
  category: string;
  timestamp: string;
  amount: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionItem: React.FC<TransactionRowProps> = ({
  description,
  category,
  timestamp,
  amount,
  onEdit,
  onDelete,
}) => {
  // Determine if it's a debit or credit transaction
  const isDebit = amount.startsWith('-');

  // Format date to show time only (e.g., "10:30 AM")
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Format date to show day and month (e.g., "20 May")
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short'
  });

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-4 mb-2 last:mb-0 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`rounded-full p-2 ${isDebit ? 'bg-red-50' : 'bg-green-50'}`}>
          <span className={`text-lg ${isDebit ? 'text-red-400' : 'text-green-400'}`}>
            {isDebit ? '↓' : '↑'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 truncate">{description}</span>
            <span className="text-xs text-gray-400">{formattedTime}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">{category}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className={`font-semibold ${isDebit ? 'text-red-500' : 'text-green-500'}`}>
            {amount}
          </div>
          <div className="text-xs text-gray-400">{formattedDate}</div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
            aria-label="Edit transaction"
          >
            <FaRegEdit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
            aria-label="Delete transaction"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
