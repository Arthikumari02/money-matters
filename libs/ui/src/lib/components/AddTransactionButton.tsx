import React from 'react';

interface AddTransactionProp {
  onclick: () => void;
}

const AddTransactionButton: React.FC<AddTransactionProp> = ({ onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="flex items-center gap-4 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-medium focus:outline-none"
    >
      <span className="text-xl font-light">+</span>
      Add Transaction
    </button>
  );
};

export default AddTransactionButton;
