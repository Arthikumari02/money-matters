import React from 'react';

interface ProfileFieldProps {
  label: string;
  value: string | number | null | undefined;
  type?: string;
  disabled?: boolean;
  formatValue?: (value: any) => string | number;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  type = 'text',
  disabled = true,
  formatValue = (val) => val,
}) => {
  const formattedValue = value ? formatValue(value) : '';
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={formattedValue}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700"
      />
    </div>
  );
};
