import { makeObservable, observable, action } from 'mobx';
import {
  fetchTotalCreditsDebitsAdmin,
  fetchTotalCreditsDebitsUser,
  fetchRecentTransactions,
  fetchDailyTotalsAdmin,
  fetchDailyTotalsUser,
} from '../apis/dashboardApi';
import {
  TransactionModel,
  TotalsModel,
  DailyTotalModel,
} from '../models/Dashboard';

class DashboardStore {
  totals: TotalsModel = { credit: 0, debit: 0 };
  recentTransactions: TransactionModel[] = [];
  dailyTotals: DailyTotalModel[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  isAdmin: boolean = false;

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

  private userId: string | null = null;

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
        if (!this.userId) {
          throw new Error('User ID is required for non-admin users');
        }
        data = await fetchTotalCreditsDebitsUser(this.userId);
      }

      // Log the response for debugging
      console.log('Totals data:', data);

      this.totals = {
        credit: data?.total_credit || data?.totalCredit || 0,
        debit: data?.total_debit || data?.totalDebit || 0,
      };
    } catch (error) {
      console.error('Error loading totals:', error);
      this.setError(String(error));
    } finally {
      this.setLoading(false);
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

      console.log('Recent transactions data:', data);

      this.recentTransactions = (data.transactions || []).map((tx: any) => ({
        id: tx.id,
        direction: tx.type === 'credit' ? 'credit' : 'debit',
        userName: tx.user_name || tx.userName || '',
        amount: tx.amount || 0,
        description: tx.description || tx.remarks || '',
        category: tx.category || '',
        timestamp: tx.timestamp || tx.date || new Date().toISOString(),
        avatarUrl: tx.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.user_name || 'U')}&background=random`,
      }));
    } catch (error) {
      this.setError(String(error));
    } finally {
      this.setLoading(false);
    }
  }

  async loadDailyTotals() {
    this.setLoading(true);
    try {
      const data = this.isAdmin
        ? await fetchDailyTotalsAdmin()
        : await fetchDailyTotalsUser(this.userId ?? '');
      this.dailyTotals = data.daywiseTotals || [];
    } catch (error) {
      this.setError(String(error));
    } finally {
      this.setLoading(false);
    }
  }
}

const dashboardStore = new DashboardStore();
export default dashboardStore;
export { DashboardStore };
