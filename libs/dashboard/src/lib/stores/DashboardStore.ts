import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  fetchTotalCreditsDebitsAdmin,
  fetchTotalCreditsDebitsUser,
  fetchRecentTransactions,
  fetchDailyTotalsAdmin,
  fetchDailyTotalsUser,
} from '../apis/dashboardApi';
import { TransactionModel } from '../models/TransactionModel';
import { TotalsModel } from '../models/TotalsModel';
import { DailyTotalModel } from '../models/DailyTotalModel';

export class DashboardStore {
  totals: TotalsModel | null = null;
  recentTransactions: TransactionModel[] = [];
  dailyTotals: DailyTotalModel[] = [];
  isLoading = false;
  error: string | null = null;
  isAdmin = false;
  private userId: string | null = null;

  constructor() {
    makeObservable(this, {
      totals: observable,
      recentTransactions: observable,
      dailyTotals: observable,
      isLoading: observable,
      error: observable,
      isAdmin: observable,
      setIsAdmin: action,
      setError: action,
      setLoading: action,
      setUserId: action,
      loadTotals: action,
      loadRecentTransactions: action,
      loadDailyTotals: action,
    });
  }

  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  async loadTotals() {
    this.setLoading(true);
    try {
      let data;
      if (this.isAdmin) {
        data = await fetchTotalCreditsDebitsAdmin();
      } else {
        if (!this.userId) throw new Error('User ID is required for non-admin users');
        data = await fetchTotalCreditsDebitsUser(this.userId);
      }

      runInAction(() => {
        this.totals = new TotalsModel({
          credit: data?.credit || 0,
          debit: data?.debit || 0,
        });
      });
    } catch (error) {
      console.error('Error loading totals:', error);
      runInAction(() => this.setError(String(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async loadRecentTransactions() {
    this.setLoading(true);
    try {
      if (!this.isAdmin && !this.userId) {
        throw new Error('User ID is required for non-admin users');
      }

      const data = await fetchRecentTransactions(
        3,
        0,
        this.isAdmin,
        this.userId ?? undefined
      );

      runInAction(() => {
        this.recentTransactions = (data.transactions || []).map(
          (tx: any) =>
            new TransactionModel({
              id: tx.id,
              amount: tx.amount || 0,
              direction: tx.type === 'credit' ? 'credit' : 'debit',
              description: tx.description || tx.remarks || '',
              category: tx.category || 'General',
              timestamp: tx.timestamp || tx.date || new Date().toISOString(),
              userId: tx.user_id || '',
              userName: tx.user_name || tx.userName || 'Unknown User',
              avatarUrl:
                tx.avatarUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  tx.user_name || 'U'
                )}&background=random`,
            })
        );
      });
    } catch (error) {
      console.error('Error loading recent transactions:', error);
      runInAction(() => this.setError(String(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async loadDailyTotals() {
    this.setLoading(true);
    try {
      const data = this.isAdmin
        ? await fetchDailyTotalsAdmin()
        : await fetchDailyTotalsUser(this.userId ?? '');

      runInAction(() => {
        this.dailyTotals = (data.daywiseTotals || []).map(
          (item: any) =>
            new DailyTotalModel({
              date: item.date,
              credit: item.credit || 0,
              debit: item.debit || 0,
            })
        );
      });
    } catch (error) {
      console.error('Error loading daily totals:', error);
      runInAction(() => this.setError(String(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }
}

const dashboardStore = new DashboardStore();
export default dashboardStore;
