import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DashboardPage from './DashboardPage';
import { DashboardProvider } from '../contexts/DashboardContext';
import { AuthStoreProvider } from '@money-matters/auth';
import { I18nextProvider } from 'react-i18next';
import { DashboardStore } from '../stores/DashboardStore';
import { AuthStore } from '@money-matters/auth';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        resources: {
            en: {
                dashboard: {
                    accounts: 'Accounts',
                    last_transaction: 'Last Transaction',
                    debit_and_credit_overview: 'Debit and Credit Overview',
                },
            },
        },
    });
}

const dashboardStore = new DashboardStore();
dashboardStore.setTotals({ credit: 50000, debit: 20000 });
dashboardStore.setRecentTransactions([
    {
        id: '1',
        transaction_name: 'Salary Credit',
        category: 'Income',
        type: 'credit',
        amount: 50000,
        date: new Date().toISOString(),
        user_id: 'user1',
        avatarUrl: 'https://i.pravatar.cc/50?img=3',
    },
    {
        id: '2',
        transaction_name: 'Groceries',
        category: 'Expense',
        type: 'debit',
        amount: 2000,
        date: new Date().toISOString(),
        user_id: 'user1',
        avatarUrl: 'https://i.pravatar.cc/50?img=5',
    },
    {
        id: '3',
        transaction_name: 'Electricity Bill',
        category: 'Utilities',
        type: 'debit',
        amount: 1500,
        date: new Date().toISOString(),
        user_id: 'user1',
        avatarUrl: 'https://i.pravatar.cc/50?img=6',
    },
]);

dashboardStore.setChartData([
    { day: 'Mon', credit: 2000, debit: 1000 },
    { day: 'Tue', credit: 3000, debit: 1200 },
    { day: 'Wed', credit: 4000, debit: 1800 },
    { day: 'Thu', credit: 2500, debit: 1600 },
    { day: 'Fri', credit: 3500, debit: 1900 },
    { day: 'Sat', credit: 2200, debit: 1400 },
    { day: 'Sun', credit: 2800, debit: 1700 },
]);

const mockAuthStore = new AuthStore();
mockAuthStore.userInfo = {
    id: 'storybook-user',
    email: 'storybook@example.com',
    isAdmin: false,
    token: 'fake-storybook-token',
    fullName: 'Storybook User',
    initials: 'SU',
    username: 'storybookuser',
    name: 'Storybook User',
};

const meta: Meta<typeof DashboardPage> = {
    title: 'Pages/DashboardPage',
    component: DashboardPage,
    decorators: [
        (Story) => (
            <I18nextProvider i18n={i18n}>
                <AuthStoreProvider value={mockAuthStore}>
                    <DashboardProvider value={dashboardStore}>
                        <div className="min-h-screen bg-gray-50">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                                <Story />
                            </div>
                        </div>
                    </DashboardProvider>
                </AuthStoreProvider>
            </I18nextProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        backgrounds: { default: 'gray-50' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
    name: 'Default (User View)',
    args: {},
    decorators: [
        (Story) => {
            mockAuthStore.userInfo = {
                ...mockAuthStore.userInfo!,
                isAdmin: false,
            };
            dashboardStore.setIsAdmin(false);
            return <Story />;
        },
    ],
};

export const AdminView: Story = {
    name: 'Admin View',
    args: {},
    decorators: [
        (Story) => {
            mockAuthStore.userInfo = {
                ...mockAuthStore.userInfo!,
                isAdmin: true,
            };
            dashboardStore.setIsAdmin(true);
            return <Story />;
        },
    ],
};

export const Loading: Story = {
    render: () => (
        <div className="p-6 bg-gray-50 min-h-screen">
            <p>Loading dashboard...</p>
        </div>
    ),
};
