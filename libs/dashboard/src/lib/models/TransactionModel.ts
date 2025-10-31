import { action, computed, makeObservable, observable } from 'mobx';
import { BaseModel } from './BaseModel';

export type TransactionDirection = 'credit' | 'debit';

export class TransactionModel extends BaseModel {
  amount: number;
  direction: TransactionDirection;
  description: string;
  category: string;
  timestamp: string;
  userId: string;
  userName: string;
  avatarUrl: string;

  constructor(data: {
    id: string;
    name?: string;
    amount: number;
    direction: TransactionDirection;
    description: string;
    category: string;
    timestamp: string;
    userId: string;
    userName: string;
    avatarUrl: string;
  }) {
    super(data.id, data.name || data.description);

    this.amount = data.amount;
    this.direction = data.direction;
    this.description = data.description;
    this.category = data.category;
    this.timestamp = data.timestamp;
    this.userId = data.userId;
    this.userName = data.userName;
    this.avatarUrl = data.avatarUrl;

    makeObservable(this, {
      amount: observable,
      direction: observable,
      description: observable,
      category: observable,
      timestamp: observable,
      userName: observable,
      avatarUrl: observable,
      formattedDate: computed,
      updateDescription: action,
    });
  }

  get formattedDate(): string {
    return new Date(this.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  updateDescription(newDescription: string) {
    this.description = newDescription;
  }
}
