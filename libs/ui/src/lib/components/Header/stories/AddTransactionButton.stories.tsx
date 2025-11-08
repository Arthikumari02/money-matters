import type { Meta, StoryObj } from '@storybook/react';
import AddTransactionButton from '../AddTransactionButton';

const meta = {
    title: 'Components/AddTransactionButton',
    component: AddTransactionButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        userId: { control: 'text' },
        className: { control: 'text' },
        onSuccess: { action: 'onSuccess' },
    },
    args: {
        userId: 'test-user-123',
    },
} satisfies Meta<typeof AddTransactionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
