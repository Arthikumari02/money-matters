export const TableRow = `
  border-b border-[#E5E9F2]
  hover:bg-[#F8FAFC]
  transition-colors duration-200
`;

export const CellBase = `
  py-3 px-8 text-sm text-[#505887] font-sans align-middle
`;

export const IconCell = `
  flex items-center gap-4
`;

export const IconContainer = `
  flex items-center justify-center w-[32px] h-[32px]
`;

export const UserSection = `
  flex items-center gap-3 min-w-[160px]
`;

export const Avatar = `
  w-8 h-8 rounded-full object-cover border border-gray-200
`;

export const UserName = `
  text-[#333B69] font-medium text-sm truncate
`;

export const CreditIcon = `text-[#16DBAA]`;
export const DebitIcon = `text-[#FE5C73]`;

export const TransactionName = `
  text-[#333B69] text-[15px] font-medium truncate capitalize
`;

export const CategoryText = `
  text-[#718EBF] text-[14px] text-center capitalize truncate
  min-w-[120px]
`;

export const DateText = `
  text-[#505887] text-[14px] text-center
  min-w-[160px]
`;

export const AmountText = (type: 'credit' | 'debit') => `
  text-right font-semibold text-[15px] min-w-[100px]
  ${type === 'credit' ? 'text-[#16DBAA]' : 'text-[#FE5C73]'}
`;

export const ActionCell = `
  text-right min-w-[90px] px-6
`;

export const ActionsWrapper = `
  flex items-center justify-end gap-3
`;

export const ActionButton = `
  transition-colors p-1 disabled:opacity-50
`;

export const EditButton = `
  text-[#2D60FF] hover:text-blue-500
`;

export const DeleteButton = `
  text-[#FE5C73] hover:text-red-400
`;
