import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'number', 'date', 'select', 'textarea']
      }
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Form Field',
    name: 'formField',
    type: 'text',
    value: '',
    onChange: (name: string, value: string) => console.log(`${name} changed to:`, value),
    placeholder: 'Enter text here',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled field',
  },
};

export const WithError: Story = {
  args: {
    error: 'This field is required',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

export const DateInput: Story = {
  args: {
    type: 'date',
    label: 'Date of Birth',
  },
};

export const SelectInput: Story = {
  args: {
    type: 'select',
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
    ],
    placeholder: 'Select a country',
  },
};

export const TextareaInput: Story = {
  args: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter a description',
  },
};
