import React, { useState } from 'react';
import { toast } from 'react-toastify';
import TransactionModal from '../Modals/TransactionModal';
import {
  addTransaction,
  TransactionInput,
} from '../../services/transactionApi';
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation('transaction');

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

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await addTransaction(userId, formData);
      onSuccess?.();

      setIsOpen(false);
      setFormData({
        name: '',
        type: 'credit',
        category: '',
        amount: 0,
        date: '',
      });

      toast.success('Transaction added successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        className={`
          flex items-center gap-3 
          bg-blue-600 hover:bg-blue-700 
          text-white text-base font-medium 
          rounded-lg 
          px-4 py-1 
          focus:outline-none transition-all 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        <span className="text-xl font-light">+</span>
        {isLoading ? t('adding_transaction') : t('add_transaction_button')}
      </button>

      <TransactionModal
        mode="add"
        userId={userId}
        isOpen={isOpen}
        transactionData={{
          ...formData,
          amount: formData.amount.toString(),
        }}
        onClose={() => setIsOpen(false)}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </>
  );
};

export default AddTransactionButton;
