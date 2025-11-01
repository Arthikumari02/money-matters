import { makeAutoObservable, computed } from 'mobx';
import { Transaction, TransactionType } from '../types/transaction';

export class TransactionStore {
  transactions: Transaction[] = [];
  isLoading = false;
  error: string | null = null;
  activeTab: 'all' | TransactionType = 'all';
  searchQuery = '';
  hasMore = true;
  currentPage = 0;
  totalCount = 0;
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      filteredTransactions: computed,
    });
  }

  setTransactions = (transactions: Transaction[]) => {
    this.transactions = transactions;
  };

  setUserId = (userId: string) => {
    this.userId = userId;
  };

  addTransactions = (transactions: Transaction[]) => {
    this.transactions = [...this.transactions, ...transactions];
  };

  addTransaction = (transaction: Transaction) => {
    this.transactions = [transaction, ...this.transactions];
  };

  updateTransaction = (id: string, updates: Partial<Transaction>) => {
    this.transactions = this.transactions.map((tx) =>
      tx.id === id ? { ...tx, ...updates } : tx
    );
  };

  removeTransaction = (id: string) => {
    this.transactions = this.transactions.filter((tx) => tx.id !== id);
  };

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  setActiveTab = (tab: 'all' | TransactionType) => {
    this.activeTab = tab;
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  setHasMore = (hasMore: boolean) => {
    this.hasMore = hasMore;
  };

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  setTotalCount = (count: number) => {
    this.totalCount = count;
  };

  get filteredTransactions() {
    return this.transactions.filter((tx) => {
      const matchesTab = this.activeTab === 'all' || tx.type === this.activeTab;
      const matchesSearch =
        tx.transaction_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        tx.category?.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesUser = !this.userId || tx.user_id === this.userId;
      return matchesTab && matchesSearch && matchesUser;
    });
  }

  reset = () => {
    this.transactions = [];
    this.isLoading = false;
    this.error = null;
    this.activeTab = 'all';
    this.searchQuery = '';
    this.hasMore = true;
    this.currentPage = 0;
    this.totalCount = 0;
  };
}

export const transactionStore = new TransactionStore();
