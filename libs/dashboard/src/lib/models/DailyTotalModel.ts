export class DailyTotalModel {
  date: string;
  credit: number;
  debit: number;

  constructor(data: any) {
    this.date = data.date;
    this.credit = data.credit;
    this.debit = data.debit;
  }
}
