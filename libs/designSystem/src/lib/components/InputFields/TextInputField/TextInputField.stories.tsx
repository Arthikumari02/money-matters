import type { Meta, StoryObj } from "@storybook/react";
import { TextInputField } from "./TextInputField";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const meta: Meta<typeof TextInputField> = {
    title: "Form/TextInputField",
    component: TextInputField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["xs", "sm", "md"],
        },
        isDisabled: { control: "boolean" },
        isInvalid: { control: "boolean" },
        isRequired: { control: "boolean" },
        value: { control: "text" },
    },
};

export default meta;

type Story = StoryObj<typeof TextInputField>;

export const Default: Story = {
    args: {
        size: "md",
        isRequired: false,
        isInvalid: false,
        isDisabled: false,
    },
    render: (args) => (
        <div className="w-80">
            <TextInputField {...args}>
                <TextInputField.Label>Username</TextInputField.Label>
                <TextInputField.Input placeholder="Enter your name" />
            </TextInputField>
        </div>
    ),
};

export const Required: Story = {
    args: {
        size: "md",
        isRequired: true,
    },
    render: (args) => (
        <div className="w-80">
            <TextInputField {...args}>
                <TextInputField.Label>Email</TextInputField.Label>
                <TextInputField.Input placeholder="Enter your email" />
            </TextInputField>
        </div>
    ),
};

export const ErrorState: Story = {
    args: {
        size: "md",
        isInvalid: true,
    },
    render: (args) => (
        <div className="w-80">
            <TextInputField {...args}>
                <TextInputField.Label>Password</TextInputField.Label>
                <TextInputField.Input placeholder="Enter password" />
                <TextInputField.Error>Password must be at least 6 characters</TextInputField.Error>
            </TextInputField>
        </div>
    ),
};

export const WithHelperText: Story = {
    args: {
        size: "md",
    },
    render: (args) => (
        <div className="w-80">
            <TextInputField {...args}>
                <TextInputField.Label>Website</TextInputField.Label>
                <TextInputField.Input placeholder="https://example.com" >
                    <TextInputField.LeftIcon>
                        <AiOutlineQuestionCircle className="text-gray-400 w-5 h-5" />
                    </TextInputField.LeftIcon>
                </TextInputField.Input>
                <TextInputField.Helper>Enter a valid URL</TextInputField.Helper>
            </TextInputField>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-6 w-80">
            <TextInputField size="xs">
                <TextInputField.Label>Extra Small</TextInputField.Label>
                <TextInputField.Input placeholder="Extra Small size" />
            </TextInputField>

            <TextInputField size="sm">
                <TextInputField.Label>Small</TextInputField.Label>
                <TextInputField.Input placeholder="Small size" />
            </TextInputField>

            <TextInputField size="md">
                <TextInputField.Label>Medium</TextInputField.Label>
                <TextInputField.Input placeholder="Medium size" />
            </TextInputField>
        </div>
    ),
};
