import { TransactionModel, DailyTotalModel, TotalsModel } from '../models/DashboardModel';

export const formatTransaction = (data: any): TransactionModel => {
    return new TransactionModel({
        id: data.id,
        amount: data.amount || 0,
        direction: data.direction || data.type || 'debit',
        description: data.transaction_name || data.description || 'No description',
        category: data.category || 'Uncategorized',
        timestamp: data.date || data.timestamp || new Date().toISOString(),
        userId: data.user_id || data.userId || '',
        userName: data.user_name || data.userName || 'Unknown User',
        createdAt: data.created_at || data.createdAt || new Date().toISOString(),
        updatedAt: data.updated_at || data.updatedAt || new Date().toISOString(),
        avatarUrl: data.avatar_url || data.avatarUrl || '',

    });
};

export const formatDailyTotal = (data: any): DailyTotalModel => {
    return new DailyTotalModel({
        date: data.date || new Date().toISOString(),
        credit: data.credit || data.total_credit || 0,
        debit: data.debit || data.total_debit || 0,
    });
};

export const formatTotals = (data: any) => ({
    credit: data.credit || data.total_credit || 0,
    debit: data.debit || data.total_debit || 0,
});
