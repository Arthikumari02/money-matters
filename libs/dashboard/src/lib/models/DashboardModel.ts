import { action, makeObservable, observable } from 'mobx';
import { TransactionModel } from './TransactionModel';
import { TotalsModel } from './TotalsModel';
import { DailyTotalModel } from './DailyTotalModel';

export class DashboardModel {
    totals: TotalsModel;
    recentTransactions: TransactionModel[];
    dailyTotals: DailyTotalModel[];

    constructor(data: {
        totals: TotalsModel;
        recentTransactions: TransactionModel[];
        dailyTotals: DailyTotalModel[];
    }) {
        this.totals = data.totals;
        this.recentTransactions = data.recentTransactions;
        this.dailyTotals = data.dailyTotals;

        makeObservable(this, {
            totals: observable,
            recentTransactions: observable,
            dailyTotals: observable,
            addTransaction: action,
        });
    }

    addTransaction(transaction: TransactionModel) {
        this.recentTransactions.unshift(transaction);
    }
}
