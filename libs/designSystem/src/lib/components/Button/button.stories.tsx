import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonVariantType, ButtonSizeType } from './button';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'primaryOutline',
        'primaryLink',
        'primaryGhost',
        'destructive',
        'destructiveOutline',
        'destructiveLink',
        'destructiveGhost',
        'secondaryOutline',
        'secondaryLink',
        'secondaryGhost',
      ],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Button size',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    leftIcon: <FaPlus />,
    rightIcon: <FaSignOutAlt />,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Primary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    text: 'Delete',
  },
};

export const DisabledState: Story = {
  args: {
    isDisabled: true,
    text: 'Disabled Button',
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
    text: 'Loading...',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <FaPlus />,
    text: 'Add Item',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <FaSignOutAlt />,
    text: 'Sign Out',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      {(
        [
          'primary',
          'primaryOutline',
          'primaryLink',
          'primaryGhost',
          'destructive',
          'destructiveOutline',
          'destructiveLink',
          'destructiveGhost',
          'secondaryOutline',
          'secondaryLink',
          'secondaryGhost',
        ] as ButtonVariantType[]
      ).map((variant) => (
        <div key={variant} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{variant}</h3>
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as ButtonSizeType[]).map(
            (size) => (
              <div key={`${variant}-${size}`} className="mb-2">
                <Button
                  variant={variant}
                  size={size}
                  text={`${variant} ${size}`}
                  leftIcon={<FaPlus />}
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  ),
};
