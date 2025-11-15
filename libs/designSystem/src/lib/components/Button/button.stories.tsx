import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Mail, Download, Plus, Trash2, Save } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link', 'ghost'],
      description: 'Button variant style',
    },
    intent: {
      control: 'select',
      options: ['primary', 'destructive', 'neutral'],
      description: 'Button intent/color scheme',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    intent: 'primary',
    variant: 'solid',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    intent: 'destructive',
    variant: 'solid',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const WithLeadingIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <Mail />
      </Button.Icon>
      <Button.Text>Send Email</Button.Text>
    </Button>
  ),
};

export const WithTrailingIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Button.Text>Download</Button.Text>
      <Button.Icon>
        <Download />
      </Button.Icon>
    </Button>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args} isDisabled>
      <Button.Loader />
      <Button.Text>Loading...</Button.Text>
    </Button>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    isDisabled: true,
  },
};

export const PrimaryShortcut: Story = {
  render: () => (
    <Button.Primary>
      <Button.Text>Primary Shortcut</Button.Text>
    </Button.Primary>
  ),
};

export const DangerShortcut: Story = {
  render: () => (
    <Button.Danger>
      <Button.Icon>
        <Trash2 />
      </Button.Icon>
      <Button.Text>Delete Item</Button.Text>
    </Button.Danger>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Solid Variants</h3>
        <div className="flex gap-4">
          <Button intent="primary" variant="solid">Primary</Button>
          <Button intent="destructive" variant="solid">Destructive</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Outline Variants</h3>
        <div className="flex gap-4">
          <Button intent="primary" variant="outline">Just Test</Button>
          <Button intent="destructive" variant="outline">Destructive</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ghost Variants</h3>
        <div className="flex gap-4">
          <Button intent="primary" variant="ghost">Primary</Button>
          <Button intent="destructive" variant="ghost">Destructive</Button>
        </div>
      </div>
    </div>
  ),
};