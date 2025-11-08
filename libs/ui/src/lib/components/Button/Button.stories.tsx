import type { Meta, StoryObj } from '@storybook/react';
import { FaPlus, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['add', 'delete', 'leave', 'text'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const AddTransaction: Story = {
  args: {
    variant: 'add',
    children: 'Add Transaction',
    icon: <FaPlus />,
  },
};

export const Delete: Story = {
  args: {
    variant: 'delete',
    children: 'Delete',
    icon: <FaTrash />,
  },
};

export const Leave: Story = {
  args: {
    variant: 'leave',
    children: 'Leave',
    icon: <FaSignOutAlt />,
  },
};

export const TextOnly: Story = {
  args: {
    variant: 'text',
    children: 'Just Text',
  },
};

export const Loading: Story = {
  args: {
    variant: 'add',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'add',
    children: 'Disabled',
    disabled: true,
  },
};