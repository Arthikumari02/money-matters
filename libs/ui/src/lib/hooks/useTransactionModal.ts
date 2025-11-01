import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

interface TransactionData {
  name: string;
  type: string;
  category: string;
  amount: string;
  date: string;
}

interface UseTransactionModalProps {
  mode: 'add' | 'edit';
  userId: string;
  transactionId?: string;
  onSuccess?: () => void;
  initialData?: Partial<TransactionData>;
}

const useTransactionModal = ({
  mode,
  userId,
  transactionId = '',
  onSuccess,
  initialData = {},
}: UseTransactionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TransactionData>({
    name: '',
    type: '',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Transaction name is required';
    } else if (formData.name.length > 30) {
      newErrors.name = 'Name should not exceed 30 characters';
    }

    if (!formData.type) {
      newErrors.type = 'Please select a transaction type';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        userId,
      };

      const url = mode === 'add'
        ? 'https://bursting-gelding-24.hasura.app/api/rest/add-transaction'
        : `https://bursting-gelding-24.hasura.app/api/rest/update-transaction/${transactionId}`;

      const method = mode === 'add' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to process transaction');
      }

      toast.success(
        mode === 'add'
          ? 'Transaction added successfully!'
          : 'Transaction updated successfully!'
      );

      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast.error(
        `Failed to ${mode} transaction. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = useCallback((data?: Partial<TransactionData>) => {
    const defaultData = {
      name: '',
      type: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    };

    if (data) {
      setFormData({
        ...defaultData,
        ...data,
        amount: data.amount?.toString() || '',
      });
    } else {
      setFormData({
        ...defaultData,
        ...initialData,
      });
    }
    
    setIsOpen(true);
    setErrors({});
  }, [initialData]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setFormData({
      name: '',
      type: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      ...initialData,
    });
    setErrors({});
  }, [initialData]);

  return {
    isOpen,
    isLoading,
    formData,
    errors,
    openModal,
    closeModal,
    handleInputChange,
    handleSubmit,
  };
};

export default useTransactionModal;
