import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import {
  getBaseClasses,
  getButtonVariantClasses,
  getButtonSizeClasses,
  getIconSize,
  getSpinnerColor,
} from '../../utils/buttonStyles';
import { ButtonProps } from '../../types/button.types';

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
      <span className="flex items-center justify-center w-full gap-2">
        {isLoading && (
          <span
            className={`animate-spin border-2 border-t-transparent rounded-full w-4 h-4 ${getSpinnerColor(
              variant
            )}`}
          ></span>
        )}
        {((isLoading && text) || (!isLoading && text)) && (
          <span className="capitalize">{text}</span>
        )}
        {!isLoading && leftIcon && (
          <span
            className="flex items-center"
            style={{ fontSize: getIconSize(size) }}
          >
            {leftIcon}
          </span>
        )}
        {!isLoading && rightIcon && (
          <span
            className="flex items-center"
            style={{ fontSize: getIconSize(size) }}
          >
            {rightIcon}
          </span>
        )}
      </span>
    </AriaButton>
  );
};

export default Button;
