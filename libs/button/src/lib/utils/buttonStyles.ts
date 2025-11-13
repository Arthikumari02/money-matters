import { ButtonVariantType, ButtonSizeType } from '../components/button';

export const getBaseClasses = (isLoading: boolean) =>
    'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 gap-2 disabled:cursor-not-allowed' +
    (isLoading ? ' cursor-wait opacity-90 pointer-events-none' : '');

export const getButtonVariantClasses = (variant: ButtonVariantType = 'primary', isDisabled: boolean, isLoading: boolean) => {
    const visuallyDisabled = isDisabled && !isLoading;

    switch (variant) {
        case 'primary':
            return `
        bg-[#1570EF] text-white hover:bg-[#175CD3] focus:ring-[#1570EF]
        ${visuallyDisabled ? 'bg-[#F9FAFB] disabled:text-[#98A2B3] disabled:border disabled:border-[#EAECF0]' : ''}
      `;

        case 'primaryOutline':
            return `
        text-[#175CD3] border border-[#84CAFF]
        hover:bg-[#EFF8FF] focus:ring-[#D1E9FF]
        disabled:text-[#98A2B3] disabled:border-[#EAECF0]
      `;

        case 'primaryLink':
            return `
        text-[#1849A9] bg-transparent
        hover:bg-[#EFF8FF]
        disabled:text-[#98A2B3]
      `;

        case 'primaryGhost':
            return `
        bg-transparent text-[#1849A9]
        hover:bg-[#EFF8FF]
        disabled:text-[#98A2B3]
      `;

        case 'destructive':
            return `
        bg-[#D92D20] text-white hover:bg-[#B42318] focus:ring-[#D92D20]
        ${visuallyDisabled ? 'bg-[#F9FAFB] disabled:text-[#98A2B3] disabled:border disabled:border-[#EAECF0]' : ''}
      `;

        case 'destructiveOutline':
            return `
        border border-[#FDA29B] text-[#B42318] bg-transparent
        hover:bg-[#FEF3F2] focus:ring-[#F044383D]
        disabled:text-[#98A2B3] disabled:border-[#EAECF0]
      `;

        case 'destructiveLink':
            return `
        text-[#B42318] hover:bg-[#FEF3F2]
        disabled:text-[#98A2B3] disabled:no-underline
      `;

        case 'destructiveGhost':
            return `
        bg-transparent text-[#B42318] hover:bg-[#FEF3F2]
        disabled:text-[#98A2B3]
      `;

        case 'secondaryOutline':
            return `
        border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] focus:ring-[#98A2B324]
        disabled:bg-[#F9FAFB] disabled:text-[#98A2B3] disabled:border disabled:border-[#EAECF0]
      `;

        case 'secondaryLink':
            return `
        text-[#344054] bg-transparent
        hover:bg-[#F2F4F7]
        disabled:text-[#98A2B3]
      `;

        case 'secondaryGhost':
            return `
        bg-transparent text-[#344054] hover:bg-[#F2F4F7]
        disabled:text-[#98A2B3]
      `;

        default:
            return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
};

export const getButtonSizeClasses = (size: ButtonSizeType = 'md') => {
    switch (size) {
        case 'xs': return 'text-xs px-2 py-1 h-7';
        case 'sm': return 'text-sm px-3 py-1.5 h-8';
        case 'md': return 'text-sm px-4 py-2 h-9';
        case 'lg': return 'text-base px-5 py-2.5 h-10';
        case 'xl': return 'text-base px-6 py-3 h-11';
        case '2xl': return 'text-lg px-7 py-3.5 h-12';
        default: return 'text-sm px-4 py-2 h-9';
    }
};

export const getIconSize = (size: ButtonSizeType = 'md') => {
    switch (size) {
        case 'xs': return 12;
        case 'sm': return 14;
        case 'md': return 16;
        case 'lg': return 18;
        case 'xl': return 20;
        case '2xl': return 24;
        default: return 16;
    }
};

export const getSpinnerColor = (variant: ButtonVariantType): string => {
    switch (variant) {
        case 'primary':
        case 'destructive':
            return 'border-white';

        case 'primaryOutline':
            return 'border-[#175CD3]';
        case 'destructiveOutline':
            return 'border-[#B42318]';
        case 'secondaryOutline':
            return 'border-[#344054]';

        case 'primaryLink':
        case 'primaryGhost':
            return 'border-[#175CD3]';
        case 'destructiveLink':
        case 'destructiveGhost':
            return 'border-[#B42318]';
        case 'secondaryLink':
        case 'secondaryGhost':
            return 'border-[#344054]';

        default:
            return 'border-[#98A2B3]';
    }
};
