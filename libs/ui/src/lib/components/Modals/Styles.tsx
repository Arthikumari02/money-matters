export const ModalOverlay = `
  fixed inset-0 z-50 
  flex items-center justify-center 
  bg-black/30 backdrop-blur-sm
  transition-opacity duration-300
`;

export const ModalContainer = `
  bg-white 
  rounded-2xl 
  shadow-[0_8px_40px_rgba(0,0,0,0.12)]
  w-[418px] 
  p-8 
  relative 
  outline-none 
  transition-all duration-300
`;

export const ModalHeading = `
  text-[20px] font-semibold text-[#1A1A1A] mb-1
`;

export const ModalDescription = `
  text-[#6B7280] text-[14px] mb-6 leading-relaxed
`;

export const ModalFieldWrapper = `
  flex flex-col gap-5 mt-4
`;

export const ModalLabel = `
  text-sm font-medium text-[#374151] mb-1
`;

export const ModalRequired = `text-red-500 ml-1`;

export const ModalErrorText = `
  mt-1 text-xs text-red-500
`;

export const ModalAmountWrapper = `relative`;
export const ModalCurrencySymbol = `
  absolute left-3 top-1/2 -translate-y-1/2 
  text-[#6B7280] text-sm
`;

export const ModalSubmitButton = `
  w-full mt-8 
  bg-[#2D60FF] hover:bg-[#1D4ED8]
  text-white font-semibold text-sm
  py-3 rounded-xl
  shadow-sm hover:shadow-md
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export const ModalCloseButton = `
  absolute top-5 right-5
  text-[#9CA3AF] hover:text-[#4B5563]
  transition-colors
`;



export const ModalContentWrapper = `
  flex items-start gap-4
`;

export const ConfirmModalBox =
  `bg-white rounded-2xl shadow-xl
     w-[591px] p-8 relative outline-none 
     transition-transform duration-300`;

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

export const CreditDebitCard = 'bg-white rounded-2xl p-6 flex items-center justify-between shadow-md';
export const CreditAmount = 'text-3xl font-bold text-[#16DBAA] font-sans';
export const DebitAmount = 'text-3xl font-bold text-[#FE5C73] font-sans';
export const AmountLabel = 'text-[#718EBF] text-md mt-2 font-sans';
export const AmountImage = 'h-24 w-auto';

export const TransactionModalContainer = 'bg-white rounded-2xl p-6 w-full max-w-md mx-4';

export const TransactionModalHeader = 'flex justify-between items-center mb-6';
export const TransactionModalTitle = 'text-2xl font-semibold text-gray-900';
export const TransactionModalCloseButton = 'text-gray-400 hover:text-gray-600 p-1';

export const TransactionForm = 'space-y-4';

export const FormGroup = 'mb-4';
export const FormLabel = 'block text-sm font-medium text-gray-700 mb-1';
export const FormLabelRequired = 'text-red-500 ml-1';

export const InputWrapper = 'relative';
export const InputPrefix = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';
export const InputPrefixText = 'text-gray-500 text-lg';

export const FormInput = 'block w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none';
export const FormSelect = 'block w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none';
export const FormTextarea = 'w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none';

export const FormError = 'mt-1 text-sm text-red-600';

export const SubmitButton = 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

export const SelectArrowIcon = 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E';
