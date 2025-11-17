import type { Meta, StoryObj } from "@storybook/react";
import { ComboBoxField } from "./ComboBoxField";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

const teamMembers = [
    { id: "1", name: "Olivia Rhye", username: "olivia", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: "2", name: "Phoenix Baker", username: "phoenix", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: "3", name: "Lana Steiner", username: "lana", avatar: "https://i.pravatar.cc/40?img=3" },
];

const meta: Meta<typeof ComboBoxField> = {
    title: "Components/ComboBoxField",
    component: ComboBoxField,
    parameters: {
        layout: "centered"
    }
};

export default meta;
type Story = StoryObj<typeof ComboBoxField>;

export const Default: Story = {
    render: () => (
        <ComboBoxField label="Team Member" >
            <ComboBoxField.Trigger>
                <ComboBoxField.Value />
                < ComboBoxField.RightIcon >
                    <AiOutlineUser size={18} />
                </ComboBoxField.RightIcon>
            </ComboBoxField.Trigger>

            <ComboBoxField.Content>
                {
                    teamMembers.map((m) => (
                        <ComboBoxField.Option key={m.id} id={m.id} >
                            {m.name}
                        </ComboBoxField.Option>
                    ))
                }
            </ComboBoxField.Content>
        </ComboBoxField>
    )
};

export const WithLeftIcon: Story = {
    render: () => (
        <ComboBoxField label="Search Member" >
            <ComboBoxField.Trigger>
                <ComboBoxField.LeftIcon>
                    <AiOutlineSearch size={18} />
                </ComboBoxField.LeftIcon>
                < ComboBoxField.Value />
            </ComboBoxField.Trigger>

            <ComboBoxField.Content>
                {
                    teamMembers.map((m) => (
                        <ComboBoxField.Option key={m.id} id={m.id} >
                            {m.name}
                        </ComboBoxField.Option>
                    ))
                }
            </ComboBoxField.Content>

            < ComboBoxField.Helper > Type to search…</ComboBoxField.Helper>
        </ComboBoxField>
    )
};

export const ErrorState: Story = {
    render: () => (
        <ComboBoxField label="Team Member" isInvalid>
            <ComboBoxField.Trigger>
                <ComboBoxField.Value />
            </ComboBoxField.Trigger>

            <ComboBoxField.Content>
                {
                    teamMembers.map((m) => (
                        <ComboBoxField.Option key={m.id} id={m.id} >
                            {m.name}
                        </ComboBoxField.Option>
                    ))
                }
            </ComboBoxField.Content>

            < ComboBoxField.Error > Please select a team member </ComboBoxField.Error>
        </ComboBoxField>
    )
};

export const CustomOptionRendering: Story = {
    render: () => (
        <ComboBoxField label="Team Member" >
            <ComboBoxField.Trigger>
                <ComboBoxField.LeftIcon>
                    <AiOutlineSearch size={18} />
                </ComboBoxField.LeftIcon>
                < ComboBoxField.Value
                    render={(item) => (
                        <div className="flex items-center gap-2" >
                            <img
                                src={item.avatar}
                                className="w-6 h-6 rounded-full"
                                alt="avatar"
                            />
                            <div className="flex flex-col" >
                                <span>{item.name} </span>
                                < span className="text-xs text-gray-500" > @{item.username} </span>
                            </div>
                        </div>
                    )}
                />
            </ComboBoxField.Trigger>

            <ComboBoxField.Content>
                {
                    teamMembers.map((m) => (
                        <ComboBoxField.Option key={m.id} id={m.id} >
                            <div className="flex items-center gap-2" >
                                <img src={m.avatar} className="w-6 h-6 rounded-full" />
                                <div className="flex flex-col" >
                                    <span className="font-medium" > {m.name} </span>
                                    < span className="text-xs text-gray-500" > @{m.username} </span>
                                </div>
                            </div>
                        </ComboBoxField.Option>
                    ))
                }
            </ComboBoxField.Content>
        </ComboBoxField>
    )
};
