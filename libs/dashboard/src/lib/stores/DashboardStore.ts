import { makeAutoObservable } from 'mobx';
import { TotalsModel } from '../models/TotalsModel';
import { TransactionModel } from '../models/TransactionModel';
import { DailyTotalModel } from '../models/DailyTotalModel';

export class DashboardStore {
  totals: TotalsModel | null = null;
  recentTransactions: TransactionModel[] = [];
  dailyTotals: DailyTotalModel[] = [];
  isLoading = false;
  error: string | null = null;
  isAdmin = false;
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  chartData: { day: string; debit: number; credit: number }[] = [];

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
    this.totals = new TotalsModel(data);
  }

  setRecentTransactions(data: any[]) {
    this.recentTransactions = data.map((t) => new TransactionModel(t));
  }

  setDailyTotals(data: any[]) {
    this.dailyTotals = data.map((d) => new DailyTotalModel(d));
  }
}
