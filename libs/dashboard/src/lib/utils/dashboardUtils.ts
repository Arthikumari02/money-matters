import { useCallback } from 'react';
import { useFetchDashboard } from '../hooks/apis/FetchDashboard/useFetchDashboard';
import { useDashboardStore } from '../contexts/DashboardContext';

type FetchDashboardOptions = {
    onSuccess?: () => void;
    onError?: (error: string) => void;
};

export const useDashboardRefresh = (options: FetchDashboardOptions = {}) => {
    const dashboardStore = useDashboardStore();
    const { fetchDashboard } = useFetchDashboard(dashboardStore);

    const { onSuccess, onError } = options;

    const refreshDashboard = useCallback(() => {
        fetchDashboard({
            onSuccess: () => {
                console.log('Dashboard data refreshed successfully');
                onSuccess?.();
            },
            onError: (error: string) => {
                console.error('Failed to refresh dashboard:', error);
                onError?.(error);
            },
        });
    }, [fetchDashboard, onSuccess, onError]);

    const onDeleteSuccess = useCallback(() => {
        console.log('Dashboard data refreshed after delete');
        refreshDashboard();
    }, [refreshDashboard]);

    const onUpdateSuccess = useCallback(() => {
        console.log('Dashboard data refreshed after update');
        refreshDashboard();
    }, [refreshDashboard]);

    return {
        refreshDashboard,
        onDeleteSuccess,
        onUpdateSuccess,
    };
};

export const formatTransaction = (tx: any) => ({
    id: tx.id,
    userId: tx.user_id,
    description: tx.transaction_name || tx.name || 'No description',
    category: tx.category || 'Uncategorized',
    timestamp: tx.date || tx.timestamp || new Date().toISOString(),
    amount: tx.amount ? Number(tx.amount) : 0,
    userName: tx.user_name || tx.userName || 'Unknown User',
    userAvatar: tx.user_avatar,
});
