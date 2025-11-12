import React, { ButtonHTMLAttributes, useMemo } from 'react';
import classNames from 'classnames';
import {
    BASE_BUTTON_STYLES,
    PRIMARY_BUTTON,
    SECONDARY_BUTTON,
    DANGER_BUTTON,
    SUCCESS_BUTTON,
    OUTLINE_BUTTON,
    BUTTON_ICON_LEFT,
    BUTTON_LOADING
} from './Button.styles';

import { FiLoader } from 'react-icons/fi';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';

const VARIANT_STYLES = {
    primary: PRIMARY_BUTTON,
    secondary: SECONDARY_BUTTON,
    danger: DANGER_BUTTON,
    success: SUCCESS_BUTTON,
    outline: OUTLINE_BUTTON,
};

const DEFAULT_TEXTS = {
    primary: 'Submit',
    secondary: 'Cancel',
    danger: 'Delete',
    success: 'Save',
    outline: 'View',
};

const LOADING_TEXTS = {
    primary: 'Processing...',
    secondary: 'Processing...',
    danger: 'Deleting...',
    success: 'Saving...',
    outline: 'Loading...',
};

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
            BASE_BUTTON_STYLES,
            variantStyle,
            (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
            className
        ),
        [variantStyle, disabled, isLoading, className]
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
                {icon && <span className={BUTTON_ICON_LEFT}>{icon}</span>}
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
    <FiLoader className={classNames("animate-spin h-4 w-4 text-current", BUTTON_ICON_LEFT.replace('mr-2', 'mr-0'))} />
);

export default Button;