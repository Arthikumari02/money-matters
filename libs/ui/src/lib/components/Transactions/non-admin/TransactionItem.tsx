import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import ConfirmationModal from '../../Modals/ConfirmationModal';
import TransactionModal from '../../Modals/TransactionModal';
import {
  deleteTransaction,
  updateTransaction,
} from '../../../services/transactionApi';

interface TransactionItemUserProps {
  id: string;
  userId: string;
  description: string;
  category: string;
  timestamp: string;
  amount: string;
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
  const [isEditing, setIsUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTransaction({
        transactionId: id,
        userId,
      });

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

  const handleUpdate = async () => {
    setIsUpdating(true);
    onUpdateSuccess?.();
  };

  const isDebit = amount.startsWith('-');
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <div className="flex items-center border-b px-6 py-2 gap-x-6 cursor-pointer">
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            borderColor: isDebit ? '#FE5C73' : '#16DBAA',
            color: isDebit ? '#FE5C73' : '#16DBAA',
          }}
        >
          {isDebit ? <FiArrowDownCircle size={29} /> : <FiArrowUpCircle size={29} />}
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
          className={`min-w-[80px] text-right text-[15px] font-semibold ${isDebit ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
            }`}
        >
          {amount}
        </div>

        <div className="flex items-center gap-x-2 min-w-fit">
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={isEditing}
            className="text-[#2D60FF] hover:text-blue-400 transition-colors p-1"
            aria-label="Edit transaction"
          >
            <FaRegEdit className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className="text-[#FE5C73] hover:text-red-400 transition-colors p-1 disabled:opacity-50"
            aria-label="Delete transaction"
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
            type: amount.startsWith('-') ? 'Debit' : 'Credit',
            category,
            amount: amount.replace('-', ''),
            date: new Date(timestamp).toISOString().split('T')[0],
          }}
          onSuccess={handleUpdate}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
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
