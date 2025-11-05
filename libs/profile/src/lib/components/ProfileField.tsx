import React from 'react';
import * as styles from './Styles';

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
    <div className={styles.FieldContainer}>
      <label className={styles.FieldLabel}>{label}</label>
      <input
        type={type}
        value={formattedValue}
        disabled={disabled}
        className={styles.FieldInput}
      />
    </div>
  );
};
