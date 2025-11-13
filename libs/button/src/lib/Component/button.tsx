import React from 'react';

export type ButtonVariantType = 'primary' | 'secondary' | 'destructive' | 'outline';
export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  text,
  className = '',
  ...rest
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
    secondary: 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 focus:ring-blue-200',
    destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-300',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200'
  };

  const sizes = {
    xs: 'text-xs px-2 py-1 h-6',
    sm: 'text-sm px-3 py-1.5 h-8',
    md: 'text-base px-4 py-2 h-10',
    lg: 'text-lg px-6 py-2 h-12',
    xl: 'text-xl px-8 py-3 h-14',
    '2xl': 'text-2xl px-10 py-4 h-16'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
    '2xl': 'w-8 h-8'
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 transition-colors duration-200';
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const iconSize = iconSizes[size] || iconSizes.md;
  const stateClass = isDisabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${stateClass} ${className}`}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className={`animate-spin border-2 border-t-transparent border-current rounded-full ${iconSize}`} />
      ) : (
        <>
          {leftIcon && <span className={`mr-2 ${iconSize}`}>{leftIcon}</span>}
          {text}
          {rightIcon && !leftIcon && <span className={`ml-2 ${iconSize}`}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;