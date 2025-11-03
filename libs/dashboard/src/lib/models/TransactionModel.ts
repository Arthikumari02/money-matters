export class TransactionModel {
  id: string;
  amount: number;
  type: string;
  category: string;
  date: string;
  transaction_name: string;
  user_id?: string;
  avatarUrl?: string;

  constructor(data: any) {
    this.id = data.id;
    this.amount = data.amount;
    this.type = data.type;
    this.category = data.category;
    this.date = data.date;
    this.transaction_name = data.transaction_name;
    this.user_id = data.user_id;
    this.avatarUrl = data.avatarUrl;
  }
}
