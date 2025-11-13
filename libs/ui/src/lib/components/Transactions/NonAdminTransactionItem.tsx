import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../Modals/ConfirmationModal';
import TransactionModal from '../Modals/TransactionModal';
import deleteTransaction from '../../services/deleteTransactionApi';
import * as styles from './Styles';

interface TransactionItemUserProps {
  id: string;
  userId: string;
  description: string;
  category: string;
  type: 'credit' | 'debit';
  timestamp: string;
  amount: number;
  onDeleteSuccess?: () => void;
  onUpdateSuccess?: () => void;
}

const TransactionItemUser: React.FC<TransactionItemUserProps> = ({
  id,
  userId,
  description,
  category,
  type,
  timestamp,
  amount,
  onDeleteSuccess,
  onUpdateSuccess,
}) => {
  const { t } = useTranslation('modal');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTransaction({ transactionId: id, userId });
      toast.success(t('toast.deleted_successfully'));
      onDeleteSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(t('toast.delete_failed'));
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  const handleUpdateSuccess = () => {
    onUpdateSuccess?.();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <td className={styles.CellBase}>
        <div className={styles.IconCell}>
          <div className={styles.IconContainer}>
            {type === 'credit' ? (
              <FiArrowUpCircle size={24} className={styles.CreditIcon} />
            ) : (
              <FiArrowDownCircle size={24} className={styles.DebitIcon} />
            )}
          </div>
          <span className={styles.TransactionName}>{description}</span>
        </div>
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
      <td className={styles.ActionCell}>
        <div className={styles.ActionsWrapper}>
          <button
            onClick={handleEditClick}
            className={`${styles.ActionButton} ${styles.EditButton}`}
            disabled={isLoading}
            aria-label="Edit transaction"
          >
            <FaRegEdit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className={`${styles.ActionButton} ${styles.DeleteButton}`}
            disabled={isLoading}
            aria-label="Delete transaction"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </td>

      {isEditModalOpen && (
        <TransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transactionId={id}
          userId={userId}
          mode="edit"
          transactionData={{
            name: description,
            type: type,
            category,
            amount: Math.abs(amount).toString(),
            date: new Date(timestamp).toISOString().split('T')[0],
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title={t('delete.Type')}
          message={t('delete.description')}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          isDeleting={isLoading}
        />
      )}
    </>
  );
};

export default TransactionItemUser;
