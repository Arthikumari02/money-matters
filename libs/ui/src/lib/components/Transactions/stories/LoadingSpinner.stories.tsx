import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, PageLoader, InlineLoader } from '../../LoadingSpinner';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'text-blue-500',
  },
};

export const FullPageLoader: Story = {
  render: () => <PageLoader />,
  parameters: {
    docs: {
      description: {
        story: 'A full page loading spinner that centers itself in the viewport',
      },
    },
  },
};

export const InlineLoading: Story = {
  render: () => <InlineLoader />,
  parameters: {
    docs: {
      description: {
        story: 'An inline loading spinner with text',
      },
    },
  },
};
