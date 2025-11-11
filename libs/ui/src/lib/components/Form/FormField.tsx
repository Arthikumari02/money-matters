import React from 'react';
import * as styles from '../Modals/Styles';

type FormFieldProps = {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'date' | 'select' | 'textarea';
    value: string | number;
    onChange: (name: string, value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    className?: string;
};

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    placeholder = '',
    options = [],
    min,
    max,
    step,
    className = '',
}) => {
    const inputClasses = `${type === 'select' ? styles.ModalSelectBase : styles.ModalInputBase
        } ${error ? 'border-red-500' : 'border-gray-300'} ${className}`;

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    disabled={disabled}
                    className={inputClasses}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className={inputClasses}
            />
        );
    };

    return (
        <div>
            <label className={styles.ModalLabel}>
                {label}
                {required && <span className={styles.ModalRequired}>*</span>}
            </label>
            {renderInput()}
            {error && <p className={styles.ModalErrorText}>{error}</p>}
        </div>
    );
};

export default FormField;
