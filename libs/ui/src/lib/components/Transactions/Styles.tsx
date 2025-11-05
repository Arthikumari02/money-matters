export const Container =
    'flex items-center justify-between px-6 py-2 border-b border-gray-100';
export const IconContainer = 'flex items-center justify-center w-[30px]';
export const UserAvatar = 'w-8 h-8 rounded-full object-cover';
export const UserName = 'text-[#343C6A] font-medium truncate';
export const FieldBase = 'text-[14px] text-[#718EBF] text-center truncate';
export const DateField = 'min-w-[150px] text-[14px] text-[#718EBF] text-center';
export const AmountBase = 'min-w-[90px] text-right font-semibold text-[15px]';
export const CreditAmount = 'text-[#16DBAA]';
export const DebitAmount = 'text-[#FE5C73]';

export const AdminContainer =
    'flex items-center justify-between px-6 py-2 border-b border-gray-100';
export const AdminUserSection = 'flex items-center gap-3 min-w-[150px]';
export const AdminName = 'min-w-[160px] text-[#505887] text-[15px]';
export const AdminCategory = 'min-w-[120px] text-[#718EBF] text-[14px] text-center';
export const AdminAmountContainer = (type: 'credit' | 'debit') =>
    `min-w-[90px] text-right font-semibold text-[15px] ${type === 'credit' ? 'text-[#16DBAA]' : 'text-[#FE5C73]'
    }`;

export const UserContainer =
    'flex items-center border-b px-6 py-2 gap-x-6 cursor-pointer';
export const UserDescription =
    'text-[15px] text-[#505887] font-medium truncate block';
export const UserCategory =
    'min-w-[120px] text-[#718EBF] text-[14px] text-center truncate';
export const UserAmountContainer = (isDebit: boolean) =>
    `min-w-[80px] text-right text-[15px] font-semibold ${isDebit ? 'text-[#FE5C73]' : 'text-[#16DBAA]'
    }`;
export const ActionButton =
    'transition-colors p-1 disabled:opacity-50';
export const EditButton = 'text-[#2D60FF] hover:text-blue-400';
export const DeleteButton = 'text-[#FE5C73] hover:text-red-400';
export const ActionWrapper = 'flex items-center gap-x-2 min-w-fit';
