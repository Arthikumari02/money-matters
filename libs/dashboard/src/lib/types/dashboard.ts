export interface DashboardTotals {
  credit: number;
  debit: number;
}

export interface DashboardTransaction {
  id: string;
  direction: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  timestamp: string;
  userName?: string;
  avatarUrl?: string;
}

export interface DailyTotal {
  date: string;
  credit: number;
  debit: number;
}

export interface DashboardState {
  totals: DashboardTotals;
  recentTransactions: DashboardTransaction[];
  dailyTotals: DailyTotal[];
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;
  refreshData: () => Promise<void>;
}