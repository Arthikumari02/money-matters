import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSelector } from '../LanguageSelector';

const meta = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'p-4 bg-gray-100 rounded-lg',
  },
};

export const WithCustomLanguages: Story = {
  args: {
    className: 'border border-gray-200 p-2 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'LanguageSelector with custom styling. The component will use the default language options (English, हिंदी, తెలుగు) as defined in the component.',
      },
    },
  },
};
