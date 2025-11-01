import React from 'react';
import { toast } from 'react-toastify';
import TransactionModal from './TransactionModal';
import AddTransactionButton from './AddTransactionButton';
import useTransactionModal from '../hooks/useTransactionModal';

interface TransactionManagerProps {
  userId: string;
  isAdmin?: boolean;
  onTransactionSuccess?: () => void;
}

const TransactionManager: React.FC<TransactionManagerProps> = ({
  userId,
  isAdmin = false,
  onTransactionSuccess,
}) => {
  const {
    isOpen,
    isLoading,
    formData,
    errors,
    openModal,
    closeModal,
    handleInputChange,
    handleSubmit,
  } = useTransactionModal({
    mode: 'add',
    userId,
    onSuccess: () => {
      toast.success('Transaction added successfully!');
      onTransactionSuccess?.();
    },
  });

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <AddTransactionButton onClick={() => openModal()} />

      <TransactionModal
        mode="add"
        isOpen={isOpen}
        isLoading={isLoading}
        transactionData={formData}
        errors={errors}
        onClose={closeModal}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        userId={userId}
      />
    </>
  );
};

export default TransactionManager;
