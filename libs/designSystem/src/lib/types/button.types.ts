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
  | 'secondaryGhost';

export type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}
