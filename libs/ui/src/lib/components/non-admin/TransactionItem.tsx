import React from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

interface TransactionItemUserProps {
  description: string;
  category: string;
  timestamp: string;
  amount: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const TransactionItemUser: React.FC<TransactionItemUserProps> = ({
  description,
  category,
  timestamp,
  amount,
  onEdit,
  onDelete,
  onClick,
}) => {
  const isDebit = amount.startsWith('-');
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      onClick={onClick}
      className="flex items-center bg-white border px-6 py-3 gap-x-6 rounded-2xl shadow-sm hover:shadow transition-all cursor-pointer"
    >
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          borderColor: isDebit ? '#FE5C73' : '#16DBAA',
          color: isDebit ? '#FE5C73' : '#16DBAA',
        }}
      >
        {isDebit ? <FiArrowDownCircle /> : <FiArrowUpCircle />}
      </div>

      <div className="flex-1 min-w-[160px]">
        <span className="text-[15px] text-[#505887] font-medium truncate block">
          {description}
        </span>
      </div>

      <div className="min-w-[120px] text-[#718EBF] text-[14px] text-center truncate">
        {category}
      </div>

      <div className="min-w-[150px] text-[#718EBF] text-[14px] text-center">
        {formattedDate}
      </div>

      <div
        className={`min-w-[80px] text-right text-[15px] font-semibold ${
          isDebit ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
        }`}
      >
        {amount}
      </div>

      <div className="flex items-center gap-x-2 min-w-fit">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="text-[#2D60FF] hover:text-blue-400 transition-colors p-1"
          aria-label="Edit transaction"
        >
          <FaRegEdit className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="text-[#FE5C73] hover:text-red-400 transition-colors p-1"
          aria-label="Delete transaction"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TransactionItemUser;
