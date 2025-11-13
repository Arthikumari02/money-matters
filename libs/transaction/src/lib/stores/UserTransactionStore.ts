import { makeAutoObservable } from "mobx";
import { TransactionModel } from "../models/TransactionModel";

export type TabType = "all" | "credit" | "debit";

export class UserTransactionStore {
  transactions: TransactionModel[] = [];
  isLoading = false;
  error: string | null = null;
  activeTab: TabType = "all";

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
  }

  setTransactions(txs: TransactionModel[]) {
    this.transactions = txs;
  }

  setLoading(state: boolean) {
    this.isLoading = state;
  }

  setError(err: string | null) {
    this.error = err;
  }

  get filteredTransactions() {
    if (this.activeTab === "all") return this.transactions;
    return this.transactions.filter((tx) => {
      const typeMatch = this.activeTab === 'credit'
        ? tx.type === 'credit'
        : tx.type === 'debit';
      return typeMatch;
    });
  }

  reset() {
    this.transactions = [];
    this.error = null;
  }
}

export const userTransactionStore = new UserTransactionStore();
