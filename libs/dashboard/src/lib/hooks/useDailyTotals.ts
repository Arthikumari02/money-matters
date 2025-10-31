import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@money-matters/auth';
import { useDashboardStore } from '../contexts/DashboardContext';

export const useDailyTotals = () => {
    const authStore = useAuthStore();
    const dashboardStore = useDashboardStore();

    const userId = authStore.userInfo?.id || '';
    const isAdmin = !!authStore.isAdmin;

    const fetchDailyTotals = useCallback(async () => {
        if (!userId && !isAdmin) return;
        
        dashboardStore.setUserId(userId);
        dashboardStore.setIsAdmin(isAdmin);
        await dashboardStore.loadDailyTotals();
    }, [userId, isAdmin, dashboardStore]);

    // Load daily totals when the component mounts or when the user changes
    useEffect(() => {
        fetchDailyTotals();
    }, [fetchDailyTotals]);

    return {
        fetchDailyTotals,
        isLoading: dashboardStore.isLoading,
        error: dashboardStore.error,
        dailyTotals: dashboardStore.dailyTotals,
    };
};
