import React from 'react';
import { IoClose } from 'react-icons/io5';

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
  isLoading: boolean;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  mode,
  transactionData = { name: '', type: '', category: '', amount: '', date: '' },
  isOpen = false,
  isLoading = false,
  errors = {},
  onClose = () => {},
  onChange = () => {},
  onSubmit = () => {},
}) => {
  const isEditMode = mode === 'edit';
  const heading = isEditMode ? 'Update Transaction' : 'Add Transaction';
  const subText = isEditMode
    ? 'You can update your transaction here'
    : 'Enter the details of your transaction';
  const buttonLabel = isEditMode ? 'Update Transaction' : 'Add Transaction';

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

        <h2 className="text-lg font-semibold text-gray-900 mb-1">{heading}</h2>
        <p className="text-gray-500 text-sm mb-5">{subText}</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Transaction Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={transactionData.name}
              onChange={(e) => onChange('name', e.target.value)}
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
              value={transactionData.type}
              onChange={(e) => onChange('type', e.target.value)}
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
              value={transactionData.category}
              onChange={(e) => onChange('category', e.target.value)}
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
                value={transactionData.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    onChange('amount', value);
                  }
                }}
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
              value={transactionData.date}
              onChange={(e) => onChange('date', e.target.value)}
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
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
