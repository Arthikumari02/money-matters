import { TransactionData } from '../components/Modals/TransactionModal';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateTransaction = (
  formData: TransactionData,
  t: (key: string) => string
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) errors.name = t('validation.name_required');
  if (!formData.type) errors.type = t('validation.type_required');
  if (!formData.category) errors.category = t('validation.category_required');
  if (!formData.amount) errors.amount = t('validation.amount_required');
  if (!formData.date) errors.date = t('validation.date_required');

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionForm = (
  formData: TransactionData,
  t: (key: string) => string,
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  const { isValid, errors } = validateTransaction(formData, t);
  setErrors(errors);
  return isValid;
};
