export interface TransactionModel {
  id: string;
  direction: 'credit' | 'debit';
  userName: string;
  amount: number;
  description: string;
  category: string;
  timestamp: string;
  avatarUrl?: string;
}

export interface TotalsModel {
  credit: number;
  debit: number;
}

export interface DailyTotalModel {
  date: string;
  credit: number;
  debit: number;
}
