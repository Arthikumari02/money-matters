// Common Page Layout
export const PageContainer = 'min-h-screen flex flex-col bg-[#F8FAFC]';
export const HeaderContainer = 'bg-white py-6 px-10 mb-5';
export const HeaderTitle = 'text-2xl font-semibold text-[#343C6A]';
export const HeaderFlex = 'flex items-center justify-between';
export const HeaderActions = 'flex items-center space-x-3';

// Tabs (Navigation)
export const TabsContainer = 'flex space-x-8';
export const TabButtonBase =
    'py-3 text-sm font-medium border-b-2 transition-colors';
export const TabActive =
    'border-blue-600 text-blue-600';
export const TabInactive =
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

// User Transactions Layout
export const UserCardContainer =
    'bg-white p-7 rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto w-full';
export const UserTableHeader =
    'grid grid-cols-4 px-7 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100';
export const UserTableHeaderItemLeft = 'text-left';
export const UserTableHeaderItemCenter = 'text-center';
export const UserTableHeaderItemRight = 'text-right';
export const UserScrollContainer =
    'max-h-[700px] overflow-y-auto divide-y divide-gray-100';
export const NoTransactionsText =
    'py-12 text-center text-gray-500 text-sm';

// Admin Transactions Layout
export const AdminOuterContainer = 'min-h-screen bg-[#F7F9FB] flex flex-col';
export const AdminInnerContainer = 'max-w-6xl mx-auto w-full p-8';
export const AdminCard =
    'bg-white shadow-md rounded-2xl overflow-hidden';
export const AdminTableHeader =
    'grid grid-cols-5 px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-100';
export const AdminScrollContainer =
    'max-h-[720px] overflow-y-auto';
export const AdminErrorContainer =
    'p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700';
export const AdminLoadingSpinner =
    'animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500';
export const NoAdminTransactions =
    'text-center py-12 text-gray-500';
