import { DashboardStore } from '../../../stores/DashboardStore';

export interface FetchDashboardOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export interface TotalsResponse {
    transaction_totals_admin?: { type: string; sum: number }[];
    totals_credit_debit_transactions?: { type: string; sum: number }[];
}

export interface TransactionsResponse {
    transactions?: {
        id: string;
        user_id?: string;
        transaction_name?: string;
        name?: string;
        category?: string;
        date?: string;
        created_at?: string;
        amount: number;
        user_name?: string;
        user_avatar?: string;
        type?: string;
    }[];
}

export interface DailyTotalsResponse {
    last_7_days_transactions_credit_debit_totals?: { date: string; type: string; sum: number }[];
    last_7_days_transactions_totals_admin?: { date: string; type: string; sum: number }[];
}

export interface ChartData {
    day: string;
    credit: number;
    debit: number;
}

export const processDashboardData = async (
    totalsRes: Response,
    transactionsRes: Response,
    dailyTotalsRes: Response,
    isAdmin: boolean,
    store: DashboardStore,
    options?: FetchDashboardOptions
) => {
    if (!totalsRes.ok || !transactionsRes.ok || !dailyTotalsRes.ok)
        throw new Error('Failed to fetch dashboard data');

    const [totalsData, transactionsData, dailyTotalsData] = await Promise.all([
        totalsRes.json(),
        transactionsRes.json(),
        dailyTotalsRes.json(),
    ]);

    const totals =
        (isAdmin
            ? totalsData.transaction_totals_admin
            : totalsData.totals_credit_debit_transactions) || [];

    store.setTotals({
        credit: totals.find((t: any) => t.type === 'credit')?.sum || 0,
        debit: totals.find((t: any) => t.type === 'debit')?.sum || 0,
    });

    const allTransactions = (transactionsData.transactions || []).sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    store.setAllTransactions(allTransactions);

    store.setRecentTransactions(allTransactions.slice(0, 3));

    const allDays =
        dailyTotalsData.last_7_days_transactions_credit_debit_totals ||
        dailyTotalsData.last_7_days_transactions_totals_admin || [];

    const grouped = allDays.reduce((acc: any, item: any) => {
        const day = new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'short',
        });
        if (!acc[day]) acc[day] = { day, credit: 0, debit: 0 };
        if (item.type.toLowerCase() === 'credit') acc[day].credit = item.sum;
        else if (item.type.toLowerCase() === 'debit') acc[day].debit = item.sum;
        return acc;
    }, {});

    const now = new Date();
    const last7Days: { day: string; credit: number; debit: number }[] = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        last7Days.push(grouped[day] || { day, credit: 0, debit: 0 });
    }

    store.setChartData(last7Days);

    options?.onSuccess?.();
};

export default processDashboardData;
