import type { Meta, StoryObj } from '@storybook/react';
import TotalCreditsAndDebits from '../TotalCreditsAndDebits';

export default {
  title: 'Components/Modals/TotalCreditsAndDebits',
  component: TotalCreditsAndDebits,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'text' },
    isCredit: { control: 'boolean' },
    imagePath: { control: 'text' },
  },
} as Meta<typeof TotalCreditsAndDebits>;

type Story = StoryObj<typeof TotalCreditsAndDebits>;

export const CreditCard: Story = {
  args: {
    amount: '12,000',
    isCredit: true,
    imagePath: '/images/credit-card.svg',
  },
};

export const DebitCard: Story = {
  args: {
    amount: '8,500',
    isCredit: false,
    imagePath: '/images/debit-card.svg',
  },
};

// For the purpose of the story, we'll use placeholder images
CreditCard.parameters = {
  backgrounds: { default: 'light' },
  docs: {
    description: {
      story: 'A card component displaying credit amount with an image.',
    },
  },
};

DebitCard.parameters = {
  backgrounds: { default: 'light' },
  docs: {
    description: {
      story: 'A card component displaying debit amount with an image.',
    },
  },
};
