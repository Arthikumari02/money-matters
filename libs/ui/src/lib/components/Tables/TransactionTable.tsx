import React from 'react';
import TransactionItemAdmin from '../Transactions/admin/TransactionItem';
import TransactionItemUser from '../Transactions/non-admin/TransactionItem';
import { useAuthStore } from '@money-matters/auth';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

export interface Transaction {
    id: string;
    userId: string;
    description: string;
    category: string;
    timestamp: string;
    amount: number;
    onDeleteSuccess?: () => void;
    onUpdateSuccess?: () => void;
    userName?: string;
    userAvatar?: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    showPagination?: boolean;
    itemsPerPage?: number;
    showHeader?: boolean;
    className?: string;
    onDeleteSuccess?: () => void;
    onUpdateSuccess?: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    showPagination = false,
    itemsPerPage = 5,
    showHeader = true,
    className = '',
    onDeleteSuccess,
    onUpdateSuccess,
}) => {
    const { t } = useTranslation('transaction');
    const authStore = useAuthStore();
    const isAdmin = !!authStore.isAdmin;

    const paginatedTransactions = showPagination
        ? transactions.slice(0, itemsPerPage)
        : transactions;

    if (transactions.length === 0) {
        return (
            <div className={`${styles.emptyState} ${className}`}>
                {t('noTransactions') || 'No transactions found'}
            </div>
        );
    }

    return (
        <div className={`${styles.tableContainer} ${className}`}>
            <table className={styles.table}>
                {showHeader && (
                    <thead className={styles.thead}>
                        <tr>
                            {isAdmin && (
                                <th className={styles.th}>
                                    {t('admin_details.user_name') || 'User Name'}
                                </th>
                            )}
                            <th className={styles.th}>
                                {t('common_details.transaction_name') || 'Transaction Name'}
                            </th>
                            <th className={styles.th}>
                                {t('common_details.category') || 'Category'}
                            </th>
                            <th className={styles.th}>
                                {t('common_details.date') || 'Date'}
                            </th>
                            <th className={styles.th}>
                                {t('common_details.amount') || 'Amount'}
                            </th>
                        </tr>
                    </thead>
                )}

                <tbody className={styles.tbody}>
                    {paginatedTransactions.map((transaction) =>
                        isAdmin ? (
                            <tr key={transaction.id}>
                                <TransactionItemAdmin
                                    transaction={{
                                        id: transaction.id,
                                        name: transaction.description,
                                        userName: transaction.userName || '',
                                        category: transaction.category,
                                        type: transaction.amount < 0 ? 'debit' : 'credit',
                                        amount: Math.abs(transaction.amount),
                                        date: transaction.timestamp,
                                        userAvatar: transaction.userAvatar,
                                    }}
                                />
                            </tr>
                        ) : (
                            <tr key={transaction.id}>
                                <td colSpan={5}>
                                    <TransactionItemUser
                                        id={transaction.id}
                                        userId={transaction.userId}
                                        description={transaction.description}
                                        category={transaction.category}
                                        timestamp={transaction.timestamp}
                                        amount={transaction.amount}
                                        onDeleteSuccess={onDeleteSuccess}
                                        onUpdateSuccess={onUpdateSuccess}
                                    />
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
