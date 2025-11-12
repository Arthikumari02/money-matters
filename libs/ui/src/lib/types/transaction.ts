export interface TransactionInput {
  name: string;
  type: 'Credit' | 'Debit';
  category: string;
  amount: number;
  date: string;
}

export interface Transaction extends TransactionInput {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
