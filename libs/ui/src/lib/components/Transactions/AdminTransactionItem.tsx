import React from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import * as styles from './Styles';

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

const TransactionItemAdmin: React.FC<TransactionItemAdminProps> = ({ transaction }) => {
  const { userName, name, category, type, amount, date, userAvatar } = transaction;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <tr className={styles.TableRow}>
      <td className={styles.CellBase}>
        <div className={styles.IconCell}>
          <div className={styles.IconContainer}>
            {type === 'credit' ? (
              <FiArrowUpCircle size={24} className={styles.CreditIcon} />
            ) : (
              <FiArrowDownCircle size={24} className={styles.DebitIcon} />
            )}
          </div>

          <div className={styles.UserSection}>
            <img
              src={
                userAvatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`
              }
              alt={userName}
              className={styles.Avatar}
            />
            <span className={styles.UserName}>{userName}</span>
          </div>
        </div>
      </td>

      <td className={styles.CellBase}>
        <span className={styles.TransactionName}>{name}</span>
      </td>

      <td className={`${styles.CellBase} text-center`}>
        <span className={styles.CategoryText}>{category}</span>
      </td>

      <td className={`${styles.CellBase} text-center`}>
        <span className={styles.DateText}>{formattedDate}</span>
      </td>

      <td className={`${styles.CellBase} text-right`}>
        <span className={styles.AmountText(type.toLowerCase() as 'credit' | 'debit')}>
          {type === 'credit' ? '+' : '-'}${Math.abs(amount).toLocaleString()}
        </span>
      </td>
    </tr>
  );
};

export default TransactionItemAdmin;
