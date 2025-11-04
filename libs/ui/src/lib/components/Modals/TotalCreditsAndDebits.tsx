import React from 'react';

interface TotalCreditsAndDebitsProp {
  amount: string;
  isCredit: boolean;
  imagePath: string;
}

const TotalCreditsAndDebits: React.FC<TotalCreditsAndDebitsProp> = ({
  amount,
  isCredit,
  imagePath,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-md">
      <div>
        <h1
          className={`text-3xl font-bold ${
            isCredit ? 'text-green-400' : 'text-red-400'
          }`}
        >
          ${amount}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          {isCredit ? 'Credit' : 'Debit'}
        </p>
      </div>
      <img src={imagePath} alt="Credit illustration" className="h-24 w-auto" />
    </div>
  );
};

export default TotalCreditsAndDebits;
