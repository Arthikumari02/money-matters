import React from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import * as styles from '../Styles';

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
  const { userName, name, category, type, amount, date, userAvatar } = transaction;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={styles.AdminContainer}>
      <div className={styles.IconContainer}>
        {type === 'credit' ? (
          <FiArrowUpCircle size={29} className="text-[#16DBAA]" />
        ) : (
          <FiArrowDownCircle size={29} className="text-[#FE5C73]" />
        )}
      </div>

      <div className={styles.AdminUserSection}>
        <img
          src={
            userAvatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=random`
          }
          alt={userName}
          className={styles.UserAvatar}
        />
        <span className={styles.UserName}>{userName}</span>
      </div>

      <div className={styles.AdminName}>{name}</div>
      <div className={styles.AdminCategory}>{category}</div>
      <div className={styles.DateField}>{formattedDate}</div>

      <div className={styles.AdminAmountContainer(type)}>
        {type === 'credit' ? '+' : '-'}${Math.abs(amount).toLocaleString()}
      </div>
    </div>
  );
};

export default TransactionItemAdmin;
