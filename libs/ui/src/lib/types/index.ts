export interface Transaction {
  id: string;
  userId: string;
  name: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  date: string; // ISO date string
  createdAt?: string;
  updatedAt?: string;
}
