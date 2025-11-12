import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import TransactionModal from '../Modals/TransactionModal';
import Button from '../Button/Button';
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
    type: 'Credit',
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
      await addTransactionApi(userId, formData);
      onSuccess?.();

      setIsOpen(false);
      setFormData({
        name: '',
        type: 'Credit',
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
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        isLoading={isLoading}
        className="rounded-xl"
        icon={<FaPlus />}
      >
        {isLoading ? t('adding_transaction') : t('add_transaction_button')}
      </Button>

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
