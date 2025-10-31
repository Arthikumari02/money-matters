import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

export interface Transaction {
  id: string;
  transaction_name: string;
  type: 'credit' | 'debit';
  category: string;
  amount: string;
  date: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface TransactionSummary {
  balance: number;
  income: number;
  expense: number;
}

class TransactionStore {
  transactions: Transaction[] = [];
  isLoading = false;
  error: string | null = null;
  activeTab: 'all' | 'credit' | 'debit' = 'all';
  searchQuery = '';
  hasMore = true;
  currentPage = 1;
  pageSize = 10;
  userId: string | null = null;
  summary: TransactionSummary = { balance: 0, income: 0, expense: 0 };

  constructor(userId: string | null = null) {
    makeAutoObservable(this);
    this.userId = userId;
  }

  setUserId = (userId: string) => {
    this.userId = userId;
  };

  setActiveTab = (tab: 'all' | 'credit' | 'debit') => {
    this.activeTab = tab;
    this.transactions = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.fetchTransactions(true);
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.transactions = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.fetchTransactions(true);
  };

  fetchTransactions = async (reset = false) => {
    if (!this.userId || this.isLoading) return;

    try {
      this.isLoading = true;
      this.error = null;

      if (reset) {
        this.transactions = [];
        this.currentPage = 1;
        this.hasMore = true;
      }

      const offset = (this.currentPage - 1) * this.pageSize;

      const transactionsResponse = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret':
              process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            'x-hasura-role': 'user',
            'x-hasura-user-id': this.userId,
          },
          params: {
            limit: this.pageSize,
            offset,
            ...(this.activeTab !== 'all' && { type: this.activeTab }),
            ...(this.searchQuery && { search: this.searchQuery }),
          },
        }
      );

      const summaryResponse = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/transaction-summary',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret':
              process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            'x-hasura-role': 'user',
            'x-hasura-user-id': this.userId,
          },
        }
      );

      runInAction(() => {
        this.transactions = [
          ...this.transactions,
          ...transactionsResponse.data.transactions,
        ];
        this.summary = {
          balance: summaryResponse.data.balance || 0,
          income: summaryResponse.data.income || 0,
          expense: summaryResponse.data.expense || 0,
        };
        this.hasMore =
          transactionsResponse.data.transactions.length === this.pageSize;
        this.currentPage++;
      });
    } catch (err) {
      console.error('Error fetching transactions:', err);
      runInAction(() => {
        this.error = 'Failed to load transactions. Please try again.';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  deleteTransaction = async (id: string) => {
    try {
      await axios.delete(
        `https://bursting-gelding-24.hasura.app/api/rest/transactions/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret':
              process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
            'x-hasura-role': 'user',
            'x-hasura-user-id': this.userId,
          },
        }
      );

      runInAction(() => {
        this.transactions = this.transactions.filter((tx) => tx.id !== id);
        this.fetchTransactions(true);
      });
    } catch (err) {
      console.error('Error deleting transaction:', err);
      throw err;
    }
  };
}

export const useUserTransactions = (userId: string | null = null) => {
  const store = useLocalObservable(() => new TransactionStore(userId));

  useEffect(() => {
    if (userId) {
      store.setUserId(userId);
      store.fetchTransactions(true);
    }
  }, [userId, store]);

  return store;
};

export default useUserTransactions;
