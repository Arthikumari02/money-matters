import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import TransactionModal from '../Modals/TransactionModal';
import { Button } from '@money-matters/designSystem';
import {
  TransactionInput,
} from '../../types/transaction';
import addTransactionApi from '../../services/addTransactionApi';
import { useTranslation } from 'react-i18next';

interface AddTransactionButtonProps {
  userId: string;
  className?: string;
  onSuccess?: () => void;
}

const AddTransactionButton: React.FC<AddTransactionButtonProps> = ({
  userId,
  className = '',
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TransactionInput>({
    name: '',
    type: 'credit',
    category: '',
    amount: 0,
    date: '',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation('modal');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = 'Enter a valid amount';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (data: TransactionInput) => {
    setIsLoading(true);
    try {
      await addTransactionApi(userId, data);
      onSuccess?.();
      setIsOpen(false);
      toast.success('Transaction added successfully!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add transaction';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={openModal}
        isLoading={isLoading}
        isDisabled={isLoading}
        leftIcon={<FaPlus />}
        text={isLoading ? t('transaction.adding_transaction') : t('transaction.add_transaction_button')}
      />

      <TransactionModal
        mode="add"
        userId={userId}
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AddTransactionButton;
