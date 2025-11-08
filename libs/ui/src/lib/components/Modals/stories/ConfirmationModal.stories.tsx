import type { Meta, StoryObj } from '@storybook/react';
import ConfirmationModal from '../ConfirmationModal';

export default {
  title: 'Components/Modals/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
} as Meta<typeof ConfirmationModal>;

type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
  args: {
    title: 'Delete Transaction',
    message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
  },
};

export const WithLongMessage: Story = {
  args: {
    title: 'Delete Account',
    message: 'Are you absolutely sure you want to delete your account? This will permanently remove all your data, including transaction history, categories, and settings. This action cannot be undone.',
  },
};
