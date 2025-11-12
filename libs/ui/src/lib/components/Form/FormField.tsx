import React from 'react';
import * as styles from '../Modals/Styles';

type InputType = 'text' | 'number' | 'date' | 'textarea';

type FormFieldProps = {
    label: string;
    name: string;
    type?: InputType | 'select';
    value: string | number;
    onChange: (name: string, value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
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
    const isSelect = type === 'select';
    
    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    name={name}
                    value={value}
                    id={name}
                    onChange={(e) => onChange(name, e.target.value)}
                    disabled={disabled}
                    className={`${styles.FormSelect} ${error ? 'border-red-500' : ''} ${className || ''}`}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        }
        
        const inputClasses = `${styles.FormInput} ${error ? 'border-red-500' : ''} ${className || ''}`;
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
                id={name}
                className={inputClasses}
            />
        );

    };

    return (
        <div className={styles.FormGroup}>
            <label className={styles.FormLabel} htmlFor={name}>
                {label}
                {required && <span className={styles.FormLabelRequired}>*</span>}
            </label>
            {renderInput()}
            {error && <p className={styles.FormError}>{error}</p>}
        </div>
    );
};

export default FormField;
