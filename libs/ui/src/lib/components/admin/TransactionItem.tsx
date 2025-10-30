interface TransactionItemProps {
  avatarUrl: string;
  direction: 'credit' | 'debit';
  name: string;
  description: string;
  category: string;
  timestamp: string;
  amount: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  avatarUrl,
  direction,
  name,
  description,
  category,
  timestamp,
  amount,
}) => {
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
        <div className={`rounded-full p-2 ${direction === 'debit' ? 'bg-red-50' : 'bg-green-50'}`}>
          <span className={`text-lg ${direction === 'debit' ? 'text-red-400' : 'text-green-400'}`}>
            {direction === 'debit' ? '↓' : '↑'}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 truncate">{name}</span>
            <span className="text-xs text-gray-400">{formattedTime}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-4">
        <div className="text-right">
          <div className={`font-semibold ${direction === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
            {amount}
          </div>
          <div className="text-xs text-gray-400">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
