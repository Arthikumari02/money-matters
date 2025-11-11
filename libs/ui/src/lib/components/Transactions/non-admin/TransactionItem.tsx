import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import TransactionModal from '../../Modals/TransactionModal';
import { deleteTransaction } from '../../../services/transactionApi';
import * as styles from '../Styles';

interface TransactionItemUserProps {
  id: string;
  userId: string;
  description: string;
  category: string;
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
  timestamp,
  amount,
  onDeleteSuccess,
  onUpdateSuccess,
}) => {
  const { t } = useTranslation('modal');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isDebit = amount < 0;
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTransaction({ transactionId: id, userId });
      toast.success('Transaction deleted successfully!');
      onDeleteSuccess?.();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction.');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
    onUpdateSuccess?.();
    setIsEditing(false);
  };

  return (
    <>
      <div className={styles.UserContainer}>
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            color: isDebit ? '#FE5C73' : '#16DBAA',
          }}
        >
          {isDebit ? <FiArrowDownCircle size={29} /> : <FiArrowUpCircle size={29} />}
        </div>

        <div className="flex-1 min-w-[160px]">
          <span className={styles.UserDescription}>{description}</span>
        </div>

        <div className={styles.UserCategory}>{category}</div>
        <div className={styles.DateField}>{formattedDate}</div>
        <div className={styles.UserAmountContainer(isDebit)}>{amount}</div>

        <div className={styles.ActionWrapper}>
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={isEditing}
            className={`${styles.ActionButton} ${styles.EditButton}`}
          >
            <FaRegEdit className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className={`${styles.ActionButton} ${styles.DeleteButton}`}
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <TransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transactionId={id}
          userId={userId}
          mode="edit"
          transactionData={{
            name: description,
            type: isDebit ? 'Debit' : 'Credit',
            category,
            amount: Math.abs(amount).toString(),
            date: new Date(timestamp).toISOString().split('T')[0],
          }}
          onSuccess={handleUpdate}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title={t('delete.Type')}
          message={t('delete.description')}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default TransactionItemUser;
