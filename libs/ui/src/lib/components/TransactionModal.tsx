import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { updateTransaction, addTransaction } from '../services/transactionApi';
import { toast } from 'react-toastify';

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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (mode === 'edit' && transactionId) {
        const result = await updateTransaction(userId, transactionId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit | debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
        });

        if (result.success) {
          toast.success('Transaction updated successfully!');
          onSuccess?.();
          onClose();
        } else {
          toast.error(result.message || 'Failed to update transaction');
        }
      } else {
        await addTransaction(userId, {
          name: formData.name,
          type: formData.type.toLowerCase() as 'credit' | 'debit',
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
        });
        toast.success('Transaction added successfully!');
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 relative">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {mode === 'edit' ? 'Update Transaction' : 'Add Transaction'}
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          {mode === 'edit'
            ? 'You can update your transaction here'
            : 'Enter the details of your transaction'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Transaction Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter Name"
              maxLength={30}
              disabled={isLoading}
              className={`w-full border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Transaction Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={isLoading}
              className={`w-full border ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50`}
            >
              <option value="">Select Transaction Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={isLoading}
              className={`w-full border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50`}
            >
              <option value="">Select Category</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                disabled={isLoading}
                className={`w-full border ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                } rounded-lg pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
              className={`w-full border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading
            ? 'Processing...'
            : mode === 'edit'
            ? 'Update Transaction'
            : 'Add Transaction'}
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
