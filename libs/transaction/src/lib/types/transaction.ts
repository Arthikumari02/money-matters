export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id: string;
  transaction_name: string;
  category: string;
  type: TransactionType;
  amount: string; // API returns amount as string
  date: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TransactionFormData {
  transaction_name: string;
  category: string;
  type: TransactionType;
  amount: string;
  date: string;
  user_id?: string;
}

export interface TransactionSummary {
  balance: number;
  income: number;
  expense: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface TransactionFilters extends PaginationParams {
  type?: TransactionType;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
