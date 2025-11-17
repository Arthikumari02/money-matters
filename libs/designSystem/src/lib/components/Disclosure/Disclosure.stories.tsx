import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MyDisclosure from "./Disclosure";
import { UserIcon } from "lucide-react";

const meta: Meta<typeof MyDisclosure> = {
    title: "Components/MyDisclosure",
    component: MyDisclosure,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        defaultExpanded: { control: "boolean" },
        isDisabled: { control: "boolean" },
    },
};

export default meta;

type Story = StoryObj<typeof MyDisclosure>;

export const Default: Story = {
    args: {
        defaultExpanded: false,
        isDisabled: false,
    },
    render: (args) => (
        <div className="w-96">
            <MyDisclosure size="md" {...args}>
                <MyDisclosure.Trigger>
                    <MyDisclosure.Chevron position="left" />
                    <MyDisclosure.LeftIcon>
                        <UserIcon />
                    </MyDisclosure.LeftIcon>
                    <MyDisclosure.Title>Manage your account</MyDisclosure.Title>
                </MyDisclosure.Trigger>
                <MyDisclosure.Content>
                    Details on managing your account
                </MyDisclosure.Content>
            </MyDisclosure>
        </div>
    ),
};