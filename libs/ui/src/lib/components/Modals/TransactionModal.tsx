import React, { useEffect, useState, useMemo } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import updateTransaction from '../../services/updateTransactionApi';
import addTransactionApi from '../../services/addTransactionApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';
import { Button } from '@money-matters/designSystem';
import FormField from '../Form/FormField';
import { validateTransactionForm } from '../../utils/validation';

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

  const validate = () => validateTransactionForm(formData, t, setErrors);

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);

    try {
      const fullDateTime = new Date(
        `${formData.date}T${new Date().toTimeString().split(' ')[0]}`
      ).toISOString();

      if (mode === 'edit' && transactionId) {
        await updateTransaction(userId, transactionId, {
          name: formData.name,
          type: formData.type as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: fullDateTime,
        });
        toast.success(t('toast.updated_successfully'));
      } else {
        await addTransactionApi(userId, {
          name: formData.name,
          type: formData.type as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: fullDateTime,
        });
        toast.success(t('toast.added_successfully'));
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Transaction operation failed:', err);
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

  const renderFields = () => (
    <div className={styles.ModalFieldWrapper}>
      <FormField
        label={t('transaction.name')}
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
        label={t('transaction.type')}
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
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.ModalOverlay}
      className={styles.ModalContainer}
      contentLabel={mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
      shouldCloseOnOverlayClick={true}
    >
      <div className="absolute top-4 right-4 p-2 rounded-ful bg-transparent text-[#718EBF]">
        <Button
          variant="link"
          intent="primary"
          size="sm"
          onPress={onClose}
          isDisabled={isLoading}
        >
          <IoClose size={22} />
        </Button>
      </div>

      <h2 className={styles.ModalHeading}>
        {mode === 'edit' ? t('update_transaction.title') : t('add_transaction.title')}
      </h2>
      <p className={styles.ModalDescription}>
        {mode === 'edit'
          ? t('update_transaction.description')
          : t('add_transaction.description')}
      </p>

      {renderFields()}

      <Button
        variant="solid"
        intent="primary"
        size="lg"
        onPress={handleSubmit}
        className="w-full mt-8"
      >
        {isLoading ? (
          <>
            <Button.Loader />
            <Button.Text>Loading...</Button.Text>
          </>
        ) : (
          <Button.Text>{t('transaction.adding_transaction')}</Button.Text>
        )}
      </Button>
    </Modal>
  );
};

export default TransactionModal;
