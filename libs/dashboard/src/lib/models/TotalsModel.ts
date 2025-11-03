export class TotalsModel {
  credit: number;
  debit: number;

  constructor(data: any) {
    this.credit = data?.credit || 0;
    this.debit = data?.debit || 0;
  }
}
