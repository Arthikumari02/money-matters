import { makeAutoObservable } from 'mobx';
import { TransactionModel } from '../models/TransactionModel';

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  transaction_name: string;
  user_id?: string;
  avatarUrl?: string;
}

export interface Totals {
  credit: number;
  debit: number;
  [key: string]: any;
}

export interface DailyTotal {
  date: string;
  credit: number;
  debit: number;
}

export class DashboardStore {
  totals: Totals | null = null;
  recentTransactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  dailyTotals: DailyTotal[] = [];
  isLoading = false;
  error: string | null = null;
  isAdmin = false;
  userId: string | null = null;

  chartData: { day: string; debit: number; credit: number }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setChartData(data: { day: string; debit: number; credit: number }[]) {
    this.chartData = data;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setTotals(data: any) {
    this.totals = {
      credit: data.credit || 0,
      debit: data.debit || 0,
      ...data
    };
  }

  setRecentTransactions(data: any[]) {
    this.recentTransactions = Array.isArray(data)
      ? data.map(t => {
        const transaction = t instanceof TransactionModel ? t : new TransactionModel(t);

        if (!transaction.type) {
          transaction.type = transaction.amount < 0 ? 'debit' : 'credit';
        } else {
          transaction.type = transaction.type.toLowerCase();
        }

        return transaction;
      })
      : [];
  }

  setAllTransactions(data: any[]) {
    this.allTransactions = Array.isArray(data)
      ? data.map(t => {
        const transaction = t instanceof TransactionModel ? t : new TransactionModel(t);

        if (!transaction.type) {
          transaction.type = transaction.amount < 0 ? 'debit' : 'credit';
        } else {
          transaction.type = transaction.type.toLowerCase();
        }

        return transaction;
      })
      : [];
  }

  setDailyTotals(data: any[]) {
    this.dailyTotals = data.map(d => ({
      date: d.date,
      credit: d.credit || 0,
      debit: d.debit || 0
    }));
  }
}
