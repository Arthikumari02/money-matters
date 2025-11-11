
export const AddTransactionButton =
    `flex items-center gap-3 
    bg-blue-600 hover:bg-blue-700 
    text-white text-base font-medium font-sans
    rounded-lg 
    px-4 py-1 
    focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`;

export const AddTransactionIcon = 'text-xl font-light';

export const LanguageSelectorContainer = 'relative';

export const LanguageButton =
    `flex items-center 
    space-x-2 px-3 py-2 
    text-sm font-medium text-gray-700 font-sans
    hover:bg-gray-100 rounded-md transition-colors`;

export const ChevronIcon = (isOpen: boolean) =>
    `h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`;

export const LanguageMenu =
    `absolute right-0 
    mt-2 
    w-40 
    bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50`;

export const LanguageMenuList = 'py-1';

export const LanguageOption = (isActive: boolean) =>
    `block w-full text-left px-4 py-2 text-sm font-sans ${isActive
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-700 hover:bg-gray-50'
    }`;
