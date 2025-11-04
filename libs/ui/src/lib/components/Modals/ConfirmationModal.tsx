import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('modal');
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl w-[520px] p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <IoClose size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 flex-shrink-0">
            <FaExclamationTriangle size={20} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {t('delete.title')}{title}
            </h2>
            <p className="text-gray-500 text-sm">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg"
          >
            {t('delete.yes_delete')} {title}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg"
          >
            {t('delete.no_leave_it')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
