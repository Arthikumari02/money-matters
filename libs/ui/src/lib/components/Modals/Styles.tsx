export const ModalOverlay =
    `fixed inset-0 flex items-center justify-center 
    bg-black/40 backdrop-blur-sm z-50 
    transition-opacity duration-300`;

export const ConfirmModalBox =
    `bg-white rounded-2xl shadow-xl
     w-[591px] p-8 relative outline-none 
     transition-transform duration-300`;

export const ModalCloseButton =
    `absolute top-4 right-4 
    text-[#718EBF] hover:text-[#4A5568] 
    transition`;

export const ModalContentWrapper =
    `flex items-start gap-4`;

export const ConfirmIconWrapper =
    `flex items-center justify-center 
    w-14 h-14 
    rounded-full bg-yellow-100
    text-yellow-500 flex-shrink-0`;

export const ConfirmTitle =
    'text-xl font-semibold text-[#333B69] font-sans mb-1';

export const ConfirmMessage =
    'text-[#505887] text-sm font-sans leading-relaxed';

export const ConfirmButtonWrapper =
    'flex justify-start gap-3 mt-8 ml-[100px]';

export const ConfirmYesButton =
    `bg-[#DC2626] hover:bg-[#D9362B] 
    text-white font-sm 
    px-5 py-1 
    rounded-lg 
    font-sans transition-all`;

export const ConfirmCancelButton =
    `border border-[#CBD5E1] hover:bg-[#E5E7EB] 
    text-[#333B69] font-sm 
    px-5 py-1 
    rounded-lg 
    font-sans transition-all`;
export const ModalContainer =
    `bg-white rounded-2xl shadow-xl
     w-[480px] p-8 relative outline-none 
     transition-transform duration-300`;
export const ModalHeading = 'text-lg font-semibold font-sans text-[#333B69] mb-1';
export const ModalDescription = 'text-[#505887] text-sm font-sans mb-5';
export const ModalFieldWrapper = 'space-y-4';
export const ModalLabel =
    'text-sm text-[#505887] mb-1 block font-sans';
export const ModalRequired = 'text-red-500';
export const ModalInputBase =
    `w-full 
    border border-[#DFEAF2] rounded-xl 
    px-[20px] py-2 
    text-sm 
    focus:ring-2 focus:ring-[#DFEAF2] 
    outline-none disabled:opacity-50 
    font-sans`;
export const ModalSelectBase =
    `w-full 
    border-[#DFEAF2] rounded-xl 
    px-3 py-2 
    text-sm 
    focus:ring-2 focus:ring-[#DFEAF2] 
    outline-none disabled:opacity-50 
    font-sans`;
export const ModalErrorText = 'mt-1 text-sm text-red-600';
export const ModalSubmitButton =
    `w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition font-sans`;
export const ModalAmountWrapper = 'relative';
export const ModalCurrencySymbol =
    'absolute left-3 top-1/2 -translate-y-1/2 text-[#505887]';

export const CreditDebitCard =
    'bg-white rounded-2xl p-6 flex items-center justify-between shadow-md';
export const CreditAmount =
    'text-3xl font-bold text-[#16DBAA] font-sans';
export const DebitAmount =
    'text-3xl font-bold text-[#FE5C73] font-sans';
export const AmountLabel = 'text-[#718EBF] text-md mt-2 font-sans';
export const AmountImage = 'h-24 w-auto';
