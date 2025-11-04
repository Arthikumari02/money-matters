import React from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

interface TransactionItemAdminProps {
  transaction: {
    id: string;
    name: string;
    userName: string;
    category: string;
    type: 'credit' | 'debit';
    amount: number;
    date: string;
    userAvatar?: string;
  };
}

export const TransactionItemAdmin: React.FC<TransactionItemAdminProps> = ({
  transaction,
}) => {
  const { userName, name, category, type, amount, date, userAvatar } =
    transaction;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 rounded-2xl shadow-sm hover:shadow transition-all border border-gray-100">
      <div className="flex items-center w-[30px] justify-center">
        {type === 'credit' ? (
          <FiArrowUpCircle className="text-[#16DBAA] text-xl" />
        ) : (
          <FiArrowDownCircle className="text-[#FE5C73] text-xl" />
        )}
      </div>

      <div className="flex items-center gap-3 min-w-[150px]">
        <img
          src={
            userAvatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=random`
          }
          alt={userName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-[#343C6A] font-medium">{userName}</span>
      </div>

      <div className="min-w-[160px] text-[#505887] text-[15px]">{name}</div>

      <div className="min-w-[120px] text-[#718EBF] text-[14px] text-center">
        {category}
      </div>

      <div className="min-w-[150px] text-[#718EBF] text-[14px] text-center">
        {formattedDate}
      </div>

      <div
        className={`min-w-[90px] text-right font-semibold text-[15px] ${
          type === 'credit' ? 'text-[#16DBAA]' : 'text-[#FE5C73]'
        }`}
      >
        {type === 'credit' ? '+' : '-'}${Math.abs(amount).toLocaleString()}
      </div>
    </div>
  );
};

export default TransactionItemAdmin;
