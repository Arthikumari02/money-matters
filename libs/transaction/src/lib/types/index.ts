export interface Transaction {
  id: string;
  name: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionTab = 'all' | 'credit' | 'debit';

export interface TransactionSummary {
  totalCredit: number;
  totalDebit: number;
  balance: number;
}

export interface TransactionFilters {
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: 'credit' | 'debit';
}
