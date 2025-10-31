import { computed, makeObservable, observable } from 'mobx';

export class TotalsModel {
    credit: number;
    debit: number;

    constructor(data: { credit: number; debit: number }) {
        this.credit = data.credit;
        this.debit = data.debit;

        makeObservable(this, {
            credit: observable,
            debit: observable,
            totalBalance: computed,
        });
    }

    get totalBalance(): number {
        return this.credit - this.debit;
    }
}
