import { computed, makeObservable, observable } from 'mobx';

export class DailyTotalModel {
    date: string;
    credit: number;
    debit: number;

    constructor(data: { date: string; credit: number; debit: number }) {
        this.date = data.date;
        this.credit = data.credit;
        this.debit = data.debit;

        makeObservable(this, {
            date: observable,
            credit: observable,
            debit: observable,
            formattedDate: computed,
        });
    }

    get formattedDate(): string {
        return new Date(this.date).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
        });
    }
}
