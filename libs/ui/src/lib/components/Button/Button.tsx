import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'add' | 'delete' | 'leave' | 'text' | 'yes';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    add: 'bg-[#2D60FF] hover:bg-[#2D60FF]/90 text-white',
    delete: 'bg-red-600 hover:bg-red-700 text-white',
    leave: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    yes: 'bg-green-600 hover:bg-green-700 text-white',
    text: 'bg-transparent hover:bg-gray-100 text-gray-700',
};

const baseStyles = [
    'inline-flex items-center justify-center',
    'px-4 py-2',
    'rounded-md',
    'text-sm font-medium',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
];

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'add',
        isLoading = false,
        icon,
        children,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const variantStyle = variantStyles[variant] || variantStyles.add;
        const isDisabled = isLoading || disabled;

        return (
            <button
                ref={ref}
                type="button"
                disabled={isDisabled}
                className={twMerge(
                    ...baseStyles,
                    variantStyle,
                    isLoading && 'cursor-wait',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {variant === 'add' && 'Adding...'}
                        {variant === 'delete' && 'Deleting...'}
                        {variant === 'leave' && 'Leaving...'}
                        {variant === 'yes' && 'Confirming...'}
                        {variant === 'text' && 'Loading...'}
                    </>
                ) : (
                    <>
                        {icon && <span className="mr-2">{icon}</span>}
                        {children ||
                            (variant === 'add' ? 'Add Transaction' :
                                variant === 'delete' ? 'Delete' :
                                    variant === 'leave' ? 'No, Leave' :
                                        variant === 'yes' ? 'Yes' : '')}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;