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


const abcd = () => {
  format(new Date(transaction.date), 'MMM, dd, hh:mm a..aa');
}