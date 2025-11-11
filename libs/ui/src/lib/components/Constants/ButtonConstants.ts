export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost' | 'text';

type ButtonTexts = {
    [key in ButtonVariant]?: string;
};

export const LOADING_TEXTS: ButtonTexts & { text: string } = {
    primary: 'Saving...',
    danger: 'Deleting...',
    success: 'Adding...',
    text: 'Loading...',
} as const;

export const DEFAULT_TEXTS: ButtonTexts = {
    primary: 'Save',
    danger: 'Delete',
    success: 'Add',
    secondary: 'Cancel',
} as const;

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
    primary: 'bg-[#2D60FF] text-white hover:bg-[#2D60FF]/80 focus:ring-primary-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    text: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
} as const;

export const BASE_STYLES = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
