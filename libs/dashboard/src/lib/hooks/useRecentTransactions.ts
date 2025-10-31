import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';

export const useRecentTransactions = (limit: number = 3) => {
    const authStore = useAuthStore();
    const dashboardStore = useDashboardStore();

    const userId = authStore.userInfo?.id || '';
    const isAdmin = !!authStore.isAdmin;

    const fetchRecent = useCallback(async () => {
        if (!isAdmin && !userId) return;

        dashboardStore.setUserId(userId);
        dashboardStore.setIsAdmin(isAdmin);
        await dashboardStore.loadRecentTransactions();
    }, [limit, userId, isAdmin, dashboardStore]);

    useEffect(() => {
        fetchRecent();
    }, [fetchRecent]);

    return {
        fetchRecent,
        isLoading: dashboardStore.isLoading,
        error: dashboardStore.error,
        recentTransactions: dashboardStore.recentTransactions,
    };
};
