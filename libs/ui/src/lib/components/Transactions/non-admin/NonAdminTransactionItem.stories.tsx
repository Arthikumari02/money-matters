import type { Meta, StoryObj } from '@storybook/react';
import TransactionItemUser from './TransactionItem';

const meta = {
    title: 'Components/Transactions/NonAdmin/TransactionItem',
    component: TransactionItemUser,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text',
            description: 'Transaction ID',
        },
        userId: {
            control: 'text',
            description: 'User ID associated with the transaction',
        },
        description: {
            control: 'text',
            description: 'Transaction description',
        },
        category: {
            control: 'select',
            options: ['food', 'shopping', 'bills', 'entertainment', 'other'],
            description: 'Transaction category',
        },
        timestamp: {
            control: 'date',
            description: 'Transaction timestamp',
        },
        amount: {
            control: 'text',
            description: 'Transaction amount',
        },
        onDeleteSuccess: {
            action: 'deleted',
            description: 'Callback when delete is successful',
        },
        onUpdateSuccess: {
            action: 'updated',
            description: 'Callback when update is successful',
        },
    },
} satisfies Meta<typeof TransactionItemUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FoodTransaction: Story = {
    args: {
        id: '1',
        userId: 'user-123',
        description: 'Grocery Shopping',
        category: 'food',
        timestamp: new Date('2023-10-15T10:30:00Z').toISOString(),
        amount: '125.50',
    },
};

export const ShoppingTransaction: Story = {
    args: {
        id: '2',
        userId: 'user-123',
        description: 'New Laptop',
        category: 'shopping',
        timestamp: new Date('2023-10-10T14:15:00Z').toISOString(),
        amount: '999.99',
    },
};

export const BillPayment: Story = {
    args: {
        id: '3',
        userId: 'user-123',
        description: 'Electricity Bill',
        category: 'bills',
        timestamp: new Date('2023-10-01T09:00:00Z').toISOString(),
        amount: '85.30',
    },
};

export const WithLongDescription: Story = {
    args: {
        id: '4',
        userId: 'user-123',
        description: 'Monthly rent payment for the apartment in downtown',
        category: 'bills',
        timestamp: new Date('2023-10-01T00:00:00Z').toISOString(),
        amount: '1200.00',
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows how the component handles long descriptions with text truncation',
            },
        },
    },
};
