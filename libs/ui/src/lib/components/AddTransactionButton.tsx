import React from 'react';

interface AddTransactionButtonProps {
  onClick: () => void;
  className?: string;
}

const AddTransactionButton: React.FC<AddTransactionButtonProps> = ({ 
  onClick,
  className = ''
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-medium focus:outline-none ${className}`}
    >
      <span className="text-xl font-light">+</span>
      Add Transaction
    </button>
  );
};

export default AddTransactionButton;
