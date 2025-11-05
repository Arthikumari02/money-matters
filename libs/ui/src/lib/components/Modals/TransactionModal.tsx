import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { updateTransaction, addTransaction } from '../../services/transactionApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

export interface TransactionData {
  name: string;
  type: string;
  category: string;
  amount: string;
  date: string;
}

interface TransactionModalProps {
  mode: 'add' | 'edit';
  userId: string;
  transactionId?: string;
  transactionData?: Partial<TransactionData>;
  onSuccess?: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  mode,
  userId,
  transactionId,
  transactionData = { name: '', type: '', category: '', amount: '', date: '' },
  onSuccess,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation('modal');
  const [formData, setFormData] = useState<TransactionData>({
    name: transactionData.name || '',
    type: transactionData.type || '',
    category: transactionData.category || '',
    amount: transactionData.amount || '',
    date: transactionData.date || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: transactionData.name || '',
      type: transactionData.type || '',
      category: transactionData.category || '',
      amount: transactionData.amount || '',
      date: transactionData.date || '',
    });
  }, [transactionData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.name_required');
    if (!formData.type) newErrors.type = t('validation.type_required');
    if (!formData.category) newErrors.category = t('validation.category_required');
    if (!formData.amount) newErrors.amount = t('validation.amount_required');
    if (!formData.date) newErrors.date = t('validation.date_required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);

    try {
      if (mode === 'edit' && transactionId) {
        await updateTransaction(userId, transactionId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
        });
        toast.success(t('toast.updated_successfully'));
      } else {
        await addTransaction(userId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
        });
        toast.success(t('toast.added_successfully'));
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(t('toast.error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContainer}>
        <button
          onClick={onClose}
          disabled={isLoading}
          className={styles.ModalCloseButton}
        >
          <IoClose size={22} />
        </button>

        <h2 className={styles.ModalHeading}>
          {mode === 'edit'
            ? t('update_transaction.title')
            : t('add_transaction.title')}
        </h2>
        <p className={styles.ModalDescription}>
          {mode === 'edit'
            ? t('update_transaction.description')
            : t('add_transaction.description')}
        </p>

        <div className={styles.ModalFieldWrapper}>
          {[
            { key: 'name', label: t('transaction.transaction_name'), type: 'text' },
            { key: 'type', label: t('transaction.transaction_type'), type: 'select' },
            { key: 'category', label: t('transaction.category'), type: 'select' },
            { key: 'amount', label: t('transaction.amount'), type: 'number' },
            { key: 'date', label: t('transaction.date'), type: 'date' },
          ].map((field) => (
            <div key={field.key}>
              <label className={styles.ModalLabel}>
                {field.label} <span className={styles.ModalRequired}>*</span>
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={(formData as any)[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={isLoading}
                  className={`${styles.ModalInputBase} ${errors[field.key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  disabled={isLoading}
                  max={new Date().toISOString().split('T')[0]}
                  className={`${styles.ModalInputBase} ${errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              )}

              {errors[field.key] && (
                <p className={styles.ModalErrorText}>{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${styles.ModalSubmitButton} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {isLoading
            ? t('processing')
            : mode === 'edit'
              ? t('update_transaction.title')
              : t('add_transaction.title')}
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
