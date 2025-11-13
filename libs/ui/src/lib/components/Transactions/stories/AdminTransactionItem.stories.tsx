import type { Meta, StoryObj } from '@storybook/react';
import TransactionItemAdmin from '../AdminTransactionItem';

type Transaction = {
  id: string;
  name: string;
  userName: string;
  category: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  userAvatar?: string;
};

const meta = {
  title: 'Components/Transactions/Admin/TransactionItem',
  component: TransactionItemAdmin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      control: 'object',
      description: 'Transaction data with user information',
    },
  },
} satisfies Meta<typeof TransactionItemAdmin>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTransaction: Transaction = {
  id: '1',
  name: 'Grocery Shopping',
  userName: 'John Doe',
  amount: 125.5,
  type: 'debit',
  category: 'groceries',
  date: '2023-10-15T10:30:00Z',
  userAvatar: 'https://i.pravatar.cc/150?img=1',
};

export const DebitTransaction: Story = {
  args: {
    transaction: sampleTransaction,
  },
};

export const CreditTransaction: Story = {
  args: {
    transaction: {
      ...sampleTransaction,
      name: 'Freelance Work',
      amount: 500,
      type: 'credit',
      category: 'income',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
    },
  },
};

export const WithLongText: Story = {
  args: {
    transaction: {
      ...sampleTransaction,
      name: 'Monthly rent payment for the apartment in downtown',
      category: 'housing',
      amount: 1200,
      userAvatar: 'https://i.pravatar.cc/150?img=3',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles long transaction names by truncating them with an ellipsis.',
      },
    },
  },
};

export const WithGeneratedAvatar: Story = {
  args: {
    transaction: {
      ...sampleTransaction,
      name: 'Online Course',
      category: 'education',
      amount: 89.99,
      userAvatar: undefined, // Will use generated avatar from username
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a generated avatar based on the username',
      },
    },
  },
};
