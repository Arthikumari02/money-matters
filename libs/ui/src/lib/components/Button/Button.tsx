import React, { ButtonHTMLAttributes, useMemo } from 'react';
import classNames from 'classnames';
import {
    LOADING_TEXTS,
    DEFAULT_TEXTS,
    VARIANT_STYLES,
    BASE_STYLES,
    type ButtonVariant
} from '../Constants/ButtonConstants';

export type { ButtonVariant };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    isLoading = false,
    className = '',
    disabled = false,
    children,
    icon,
    ...props
}, ref) => {
    const loadingText = LOADING_TEXTS[variant] || '';
    const defaultText = DEFAULT_TEXTS[variant] || '';
    const variantStyle = VARIANT_STYLES[variant];

    const buttonClasses = useMemo(() =>
        classNames(
            BASE_STYLES,
            variantStyle,
            (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
            className
        ),
        [variant, disabled, isLoading, className]
    );

    const renderLoadingState = () => (
        <>
            <LoadingSpinner />
            {loadingText}
        </>
    );

    const renderContent = () => {
        if (isLoading) return renderLoadingState();

        return (
            <>
                {icon && <span className="mr-2">{icon}</span>}
                {children || defaultText}
            </>
        );
    };

    return (
        <button
            ref={ref}
            type="button"
            disabled={disabled || isLoading}
            className={buttonClasses}
            {...props}
        >
            {renderContent()}
        </button>
    );
});

Button.displayName = 'Button';

const LoadingSpinner = () => (
    <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

export default Button;