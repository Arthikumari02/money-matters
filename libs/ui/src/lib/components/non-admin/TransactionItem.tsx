import React, { useState, useCallback } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '../ConfirmationModal';
import TransactionModal from '../TransactionModal';
import useTransactionModal from '../../hooks/useTransactionModal';

interface TransactionItemUserProps {
  id: string;
  userId: string;
  description: string;
  category: string;
  timestamp: string;
  amount: string;
  onUpdateSuccess?: () => void;
  onDelete?: (id: string) => Promise<boolean>;
  onClick?: () => void;
}

const TransactionItemUser: React.FC<TransactionItemUserProps> = ({
  id,
  userId,
  description,
  category,
  timestamp,
  amount,
  onUpdateSuccess,
  onDelete,
  onClick,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit button clicked, opening modal');
    setIsEditModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    console.log('Closing modal');
    setIsEditModalOpen(false);
  }, []);

  const handleUpdateSuccess = useCallback(() => {
    console.log('Update successful, closing modal');
    setIsEditModalOpen(false);
    onUpdateSuccess?.();
  }, [onUpdateSuccess]);

  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    isLoading: isUpdating,
  } = useTransactionModal({
    mode: 'edit',
    userId,
    transactionId: id,
    onSuccess: handleUpdateSuccess,
    initialData: {
      name: description,
      type: amount.startsWith('-') ? 'Debit' : 'Credit',
      category,
      amount: amount.replace(/[^0-9.-]+/g, ''),
      date: new Date(timestamp).toISOString().split('T')[0],
    },
  });

  const displayAmount = useCallback((amt: string) => {
    console.log('displayAmount called with:', amt);
    const num = parseFloat(amt);
    if (isNaN(num)) return amt;
    return num >= 0 ? `+$${num.toFixed(2)}` : `-$${Math.abs(num).toFixed(2)}`;
  }, []);

  const handleDelete = async () => {
    console.log('handleDelete called');
    if (!onDelete) return;
    try {
      setIsDeleting(true);
      await onDelete(id);
      toast.success('Transaction deleted successfully!');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
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
          className={`min-w-[80px] text-right text-[15px] font-semibold ${isDebit ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
            }`}
        >
          {amount}
        </div>

        <div className="flex items-center gap-x-2 min-w-fit">
          <button
            onClick={handleEditClick}
            className="text-[#2D60FF] hover:text-blue-400 transition-colors p-1"
            disabled={isUpdating}
            aria-label="Edit transaction"
          >
            <FaRegEdit className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
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
          mode="edit"
          isOpen={isEditModalOpen}
          isLoading={isUpdating}
          transactionData={formData}
          errors={errors}
          onClose={handleCloseModal}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          userId={userId}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          title="delete this transaction"
          message="This action cannot be undone. Are you sure you want to proceed?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default TransactionItemUser;
