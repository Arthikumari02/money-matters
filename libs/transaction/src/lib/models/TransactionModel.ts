import { makeObservable, observable, action } from 'mobx';
import { BaseModel } from './BaseModel';

export type TransactionType = 'credit' | 'debit';

export class TransactionModel extends BaseModel {
  amount: number;
  type: TransactionType;
  category: string;
  userId: string;
  userName: string;
  date: string;
  userAvatar: string;

  constructor(data: {
    id: string;
    name: string;
    amount: number;
    type: TransactionType;
    category: string;
    userId: string;
    userName: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    userAvatar: string;
  }) {
    super({
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    this.amount = data.amount;
    this.type = data.type;
    this.category = data.category;
    this.userId = data.userId;
    this.userName = data.userName;
    this.date = data.date;
    this.userAvatar = data.userAvatar;

    makeObservable(this, {
      amount: observable,
      type: observable,
      category: observable,
      userId: observable,
      userName: observable,
      date: observable,
      userAvatar: observable,
      updateAmount: action,
      updateType: action,
      updateCategory: action,
      updateDate: action,
      updateAll: action,
      isValid: action,
    });
  }

  async updateName(newName: string): Promise<boolean> {
    try {
      this.name = newName;
      this.updatedAt = new Date().toISOString();
      return true;
    } catch (error) {
      console.error('Error updating transaction name:', error);
      return false;
    }
  }

  updateAmount(newAmount: number): void {
    this.amount = newAmount;
    this.updatedAt = new Date().toISOString();
  }

  updateType(newType: TransactionType): void {
    this.type = newType;
    this.updatedAt = new Date().toISOString();
  }

  updateCategory(newCategory: string): void {
    this.category = newCategory;
    this.updatedAt = new Date().toISOString();
  }

  updateDate(newDate: string): void {
    this.date = newDate;
    this.updatedAt = new Date().toISOString();
  }

  updateAll(
    updates: Partial<Omit<TransactionModel, 'id' | 'createdAt' | 'updatedAt'>>
  ): void {
    Object.assign(this, updates);
    this.updatedAt = new Date().toISOString();
  }

  isValid(): boolean {
    return (
      this.id.length > 0 &&
      this.name.length > 0 &&
      this.amount > 0 &&
      ['credit', 'debit'].includes(this.type) &&
      this.category.length > 0 &&
      this.userId.length > 0 &&
      this.userName.length > 0 &&
      !isNaN(Date.parse(this.date))
    );
  }

  isCredit(): boolean {
    return this.type === 'credit';
  }

  isDebit(): boolean {
    return this.type === 'debit';
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }
}
