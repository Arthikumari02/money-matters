import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { TransactionModel, TransactionType } from '../models/TransactionModel';

const API_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-hasura-admin-secret':
    'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
  'x-hasura-role': 'admin',
});

export class AdminTransactionsStore {
  transactions: TransactionModel[] = [];
  activeTab: 'all' | 'credit' | 'debit' = 'all';
  isLoading = false;
  error: string | null = null;
  offset = 0;
  hasMore = true;
  readonly LIMIT = 20;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTransactions(reset = false) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.error = null;

    try {
      const headers = getAuthHeaders();
      const params: any = {
        limit: this.LIMIT,
        offset: reset ? 0 : this.offset,
      };

      if (this.activeTab !== 'all') {
        params.type = this.activeTab;
      }

      const res = await axios.get(`${API_BASE_URL}/all-transactions`, {
        headers,
        params,
      });

      console.log('API Response:', res.data);

      const transactionsArray = res.data?.all_transactions ?? [];

      const fetched = transactionsArray.map(
        (tx: any) =>
          new TransactionModel({
            id: tx.id,
            name: tx.transaction_name,
            amount: parseFloat(tx.amount),
            type: tx.type.toLowerCase() as TransactionType,
            category: tx.category,
            userId: tx.user_id,
            userName: tx.user_name,
            date: tx.date,
            createdAt: tx.created_at,
            updatedAt: tx.updated_at,
            userAvatar: tx.userAvatar,
          })
      );

      runInAction(() => {
        this.transactions = reset
          ? fetched
          : [...this.transactions, ...fetched];
        this.offset = reset ? this.LIMIT : this.offset + this.LIMIT;
        this.hasMore = fetched.length === this.LIMIT;
      });
    } catch (err: any) {
      console.error('Failed to load transactions:', err);
      runInAction(() => {
        this.error = 'Failed to fetch transactions';
        this.transactions = [];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async switchTab(tab: 'all' | 'credit' | 'debit') {
    this.activeTab = tab;
    this.offset = 0;
    this.hasMore = true;
    await this.fetchTransactions(true);
  }

  reset() {
    this.transactions = [];
    this.offset = 0;
    this.error = null;
    this.hasMore = true;
  }
}
