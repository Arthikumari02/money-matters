import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ComboBoxField } from "./ComboBoxField";
import { AiOutlineSearch } from "react-icons/ai";
import type { Key } from "@react-types/shared";

const getAvatarUrl = (id: number, name: string) => {
    const nameForAvatar = name.replace(/\s+/g, '+');
    return `https://ui-avatars.com/api/?name=${nameForAvatar}&background=random&length=1&size=150`;
};

interface TeamMember {
    id: number | string;
    name: string;
    username: string;
    avatar: string;
    role: string;
    status: string;
}

const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        avatar: getAvatarUrl(1, 'John Doe'),
        role: 'Frontend Developer',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: 'janesmith',
        avatar: getAvatarUrl(2, 'Jane Smith'),
        role: 'UX Designer',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Bob Johnson',
        username: 'bobjohnson',
        avatar: getAvatarUrl(3, 'Bob Johnson'),
        role: 'Backend Developer',
        status: 'Away'
    },
    {
        id: '4',
        name: 'Alice Williams',
        username: 'alicew',
        avatar: getAvatarUrl(4, 'Alice Williams'),
        role: 'Product Manager',
        status: 'Active'
    },
    {
        id: '5',
        name: 'Demi Wilkinson',
        username: 'demi',
        avatar: getAvatarUrl(5, 'Demi Wilkinson'),
        role: 'Designer',
        status: 'Active'
    },
];

const meta: Meta<typeof ComboBoxField> = {
    title: "Components/ComboBoxField",
    component: ComboBoxField,
    parameters: {
        layout: "centered"
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md']
        },
        isDisabled: { control: 'boolean' },
        isInvalid: { control: 'boolean' },
        isRequired: { control: 'boolean' },
        value: { control: 'text' },
        defaultValue: { control: 'text' },
        onInputChange: { action: 'inputChanged' },
        onChange: { action: 'selectionChanged' }
    },
    args: {
        label: 'Team Member',
        placeholder: 'Select team member',
        description: 'This is a hint text to help user.',
        errorMessage: 'This field is required',
        size: 'md',
        isDisabled: false,
        isInvalid: false,
        isRequired: false,
    },
};

export default meta;
type Story = StoryObj<typeof ComboBoxField>;

export const Default: Story = {
    render: function Render(args) {
        const [selectedKey, setSelectedKey] = useState<Key | null>(null);
        return (
            <div className="w-80">
                <ComboBoxField
                    {...args}
                    value={selectedKey || undefined}
                    onChange={setSelectedKey}
                >
                    {teamMembers.map((member) => (
                        <ComboBoxField.Option
                            key={member.id}
                            id={String(member.id)}
                            textValue={member.name}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-6 h-6 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                        {member.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        @{member.username}
                                    </div>
                                </div>
                            </div>
                        </ComboBoxField.Option>
                    ))}
                </ComboBoxField>
            </div>
        );
    }
};

export const WithSelectedValue: Story = {
    render: function Render(args) {
        return (
            <div className="w-80">
                <ComboBoxField
                    {...args}
                    defaultValue="1"
                >
                    {teamMembers.map((member) => (
                        <ComboBoxField.Option
                            key={member.id}
                            id={String(member.id)}
                            textValue={member.name}
                        >
                            {member.name}
                        </ComboBoxField.Option>
                    ))}
                </ComboBoxField>
            </div>
        );
    }
};

export const ErrorState: Story = {
    args: {
        isInvalid: true,
        errorMessage: 'Please select a team member'
    },
    render: function Render(args) {
        const [selectedKey, setSelectedKey] = useState<Key | null>(null);

        return (
            <div className="w-80">
                <ComboBoxField
                    {...args}
                    value={selectedKey || undefined}
                    onChange={setSelectedKey}
                >
                    {teamMembers.map((member) => (
                        <ComboBoxField.Option
                            key={member.id}
                            id={String(member.id)}
                            textValue={member.name}
                        >
                            {member.name}
                        </ComboBoxField.Option>
                    ))}
                </ComboBoxField>
            </div>
        );
    }
};

export const CustomOptionRendering: Story = {
    args: {
        label: 'Team Member',
        placeholder: 'Select team member',
    },
    render: function Render(args) {
        const [selectedKey, setSelectedKey] = useState<Key | null>(null);

        return (
            <div className="w-80">
                <ComboBoxField
                    {...args}
                    value={selectedKey || undefined}
                    onChange={setSelectedKey}
                >
                    {teamMembers.map((member) => (
                        <ComboBoxField.Option
                            key={member.id}
                            id={String(member.id)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                            textValue={member.name}
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="h-full w-full rounded-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) {
                                            fallback.style.display = 'flex';
                                        }
                                    }}
                                />
                                <span className="hidden items-center justify-center text-sm font-medium text-gray-600">
                                    {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium truncate">{member.name}</span>
                                    <span className="ml-2 text-xs text-gray-500">
                                        {member.status === 'Active' ? 'Active' : 'Away'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {member.role}
                                </div>
                            </div>
                        </ComboBoxField.Option>
                    ))}
                </ComboBoxField>
            </div>
        );
    }
};
