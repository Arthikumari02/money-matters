import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import {
  getBaseClasses,
  getButtonVariantClasses,
  getButtonSizeClasses,
  getIconSize,
  getSpinnerColor
} from '../utils/buttonStyles';

export type ButtonVariantType =
  | 'primary'
  | 'primaryOutline'
  | 'primaryLink'
  | 'primaryGhost'
  | 'destructive'
  | 'destructiveOutline'
  | 'destructiveLink'
  | 'destructiveGhost'
  | 'secondaryOutline'
  | 'secondaryLink'
  | 'secondaryGhost'

export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  text,
  onClick,
}) => {
  const buttonClasses = `
    ${getBaseClasses(isLoading)}
    ${getButtonVariantClasses(variant, !!isDisabled, !!isLoading)}
    ${getButtonSizeClasses(size)}
  `;

  return (
    <AriaButton
      onPress={onClick}
      isDisabled={isDisabled || isLoading}
      className={buttonClasses}
    >
      {isLoading ? (
        <span className="flex items-center justify-center w-full">
          <span
            className={`animate-spin border-2 border-t-transparent rounded-full w-4 h-4 ${getSpinnerColor(variant)}`}
          ></span>
        </span>
      ) : (
        <>
          {leftIcon && (
            <span className="flex items-center" style={{ fontSize: getIconSize(size) }}>
              {leftIcon}
            </span>
          )}
          {text && <span className="capitalize">{text}</span>}
          {rightIcon && (
            <span className="flex items-center" style={{ fontSize: getIconSize(size) }}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </AriaButton>

  );
};

export default Button;
