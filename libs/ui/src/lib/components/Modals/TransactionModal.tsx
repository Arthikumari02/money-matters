import React, { useEffect, useState, useMemo } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { updateTransaction, addTransaction } from '../../services/transactionApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';
import Button from '../Button/Button';
import FormField from '../Form/FormField';

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
    if (!isOpen) return;

    const newFormData = {
      name: transactionData.name || '',
      type: transactionData.type || '',
      category: transactionData.category || '',
      amount: transactionData.amount || '',
      date: transactionData.date || '',
    };

    setFormData((prev) =>
      JSON.stringify(prev) === JSON.stringify(newFormData) ? prev : newFormData
    );
  }, [
    isOpen,
    transactionData?.name,
    transactionData?.type,
    transactionData?.category,
    transactionData?.amount,
    transactionData?.date,
  ]);

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

  const categoryOptions = useMemo(() => [
    { value: 'Food', label: 'Food' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Salary', label: 'Salary' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Other', label: 'Other' },
  ], []);

  const transactionTypeOptions = useMemo(() => [
    { value: 'credit', label: t('credit') },
    { value: 'debit', label: t('debit') },
  ], [t]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.ModalOverlay}
      className={styles.ModalContainer}
      contentLabel={mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
      shouldCloseOnOverlayClick={true}
    >
      <Button
        variant="primary"
        onClick={onClose}
        disabled={isLoading}
        className="absolute right-4 top-4 p-1 rounded-ful"
      >
        <IoClose size={22} />
      </Button>

      <h2 className={styles.ModalHeading}>
        {mode === 'edit' ? t('update_transaction.title') : t('add_transaction.title')}
      </h2>
      <p className={styles.ModalDescription}>
        {mode === 'edit'
          ? t('update_transaction.description')
          : t('add_transaction.description')}
      </p>

      <div className={styles.ModalFieldWrapper}>
        <FormField
          label={t('transaction.transaction_name')}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          disabled={isLoading}
          placeholder={t('add_transaction.placeholders.enter_name')}
        />

        <FormField
          label={t('transaction.transaction_type')}
          name="type"
          type="select"
          value={formData.type}
          onChange={handleChange}
          error={errors.type}
          required
          disabled={isLoading}
          options={[
            { value: '', label: t('add_transaction.placeholders.select_type') },
            { value: 'credit', label: t('credit') },
            { value: 'debit', label: t('debit') }
          ]}
        />

        <FormField
          label={t('transaction.category')}
          name="category"
          type="select"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          required
          disabled={isLoading}
          options={[
            { value: '', label: t('add_transaction.placeholders.category') },
            ...categoryOptions
          ]}
        />

        <FormField
          label={t('transaction.amount')}
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          required
          disabled={isLoading}
          placeholder={t('add_transaction.placeholders.enter_amount')}
          min="0"
          step="0.01"
        />

        <FormField
          label={t('transaction.date')}
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
          disabled={isLoading}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`${styles.ModalSubmitButton} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading
          ? t('processing')
          : mode === 'edit'
            ? t('update_transaction.title')
            : t('add_transaction.title')}
      </button>
    </Modal>
  );
};

export default TransactionModal;
