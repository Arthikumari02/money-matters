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
    const fullDateTime = new Date(
      `${formData.date}T${new Date().toTimeString().split(' ')[0]}`
    ).toISOString();
    try {
      if (mode === 'edit' && transactionId) {
        await updateTransaction(userId, transactionId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: fullDateTime,
        });
        toast.success(t('toast.updated_successfully'));
      } else {
        await addTransaction(userId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: fullDateTime,
        });
        toast.success(t('toast.added_successfully'));
      }
      onClose();
      onSuccess?.();
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
          {mode === 'edit' ? t('update_transaction.title') : t('add_transaction.title')}
        </h2>
        <p className={styles.ModalDescription}>
          {mode === 'edit'
            ? t('update_transaction.description')
            : t('add_transaction.description')}
        </p>

        <div className={styles.ModalFieldWrapper}>
          <div>
            <label className={styles.ModalLabel}>
              {t('transaction.transaction_name')} <span className={styles.ModalRequired}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isLoading}
              placeholder={t('add_transaction.placeholders.enter_name')}
              className={`${styles.ModalInputBase} ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.name && <p className={styles.ModalErrorText}>{errors.name}</p>}
          </div>

          <div>
            <label className={styles.ModalLabel}>
              {t('transaction.transaction_type')} <span className={styles.ModalRequired}>*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={isLoading}
              className={`${styles.ModalInputBase} ${errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">{t('add_transaction.placeholders.select_type')}</option>
              <option value="credit">{t('credit')}</option>
              <option value="debit">{t('debit')}</option>
            </select>
            {errors.type && <p className={styles.ModalErrorText}>{errors.type}</p>}
          </div>

          <div>
            <label className={styles.ModalLabel}>
              {t('transaction.category')} <span className={styles.ModalRequired}>*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={isLoading}
              className={`${styles.ModalInputBase} ${errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">{t('add_transaction.placeholders.category')}</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className={styles.ModalErrorText}>{errors.category}</p>}
          </div>

          <div>
            <label className={styles.ModalLabel}>
              {t('transaction.amount')} <span className={styles.ModalRequired}>*</span>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              disabled={isLoading}
              placeholder={t('add_transaction.placeholders.enter_amount')}
              className={`${styles.ModalInputBase} ${errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.amount && <p className={styles.ModalErrorText}>{errors.amount}</p>}
          </div>

          <div>
            <label className={styles.ModalLabel}>
              {t('transaction.date')} <span className={styles.ModalRequired}>*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              disabled={isLoading}
              max={new Date().toISOString().split('T')[0]}
              className={`${styles.ModalInputBase} ${errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.date && <p className={styles.ModalErrorText}>{errors.date}</p>}
          </div>
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
