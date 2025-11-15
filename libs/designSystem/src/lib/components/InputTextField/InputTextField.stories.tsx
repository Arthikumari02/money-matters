import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputTextField } from './InputTextField';
import { Info, DollarSign, CreditCard, User } from 'lucide-react';

const meta: Meta<typeof InputTextField> = {
    title: "Components/InputTextField",
    component: InputTextField,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputTextField>;


export const PhoneEmpty: Story = {
    render: () => {
        const [country, setCountry] = useState("US");

        return (
            <div className="w-80">
                <InputTextField
                    label="Phone number"
                    placeholder="+1 (555) 000-0000"
                    rightIcon={<Info />}
                    helperText="This is a hint text to help user."
                    showDropdown
                    dropdownOptions={["US", "UK", "CA", "AU", "IN"]}
                    dropdownValue={country}
                    onDropdownSelect={setCountry}
                    inputMode="tel"
                    allowedPattern={/^[0-9+\s()-]*$/}
                />
            </div>
        );
    },
};

export const PhoneFilled: Story = {
    render: () => {
        const [country, setCountry] = useState("US");

        return (
            <div className="w-80">
                <InputTextField
                    label="Phone number"
                    defaultValue="+1 (555) 000-0000"
                    leftIcon={country}
                    rightIcon={<Info />}
                    helperText="This is a hint text to help user."
                    showDropdown
                    dropdownOptions={["US", "UK", "CA", "AU", "IN"]}
                    dropdownValue={country}
                    onDropdownSelect={setCountry}
                    inputMode="tel"
                    allowedPattern={/^[0-9+\s()-]*$/}
                />
            </div>
        );
    },
};


export const SaleAmountEmpty: Story = {
    render: () => {
        const [currency, setCurrency] = useState("USD");

        return (
            <div className="w-80">
                <InputTextField
                    label="Sale amount"
                    placeholder="1,000.00"
                    leftIcon={<DollarSign />}
                    rightIcon={currency}
                    helperText="This is a hint text to help user."
                    showDropdown
                    dropdownOptions={["USD", "EUR", "GBP", "JPY"]}
                    dropdownValue={currency}
                    onDropdownSelect={setCurrency}
                    inputMode="numeric"
                    allowedPattern={/^[0-9,\.]*$/}
                />
            </div>
        );
    },
};

export const SaleAmountFilled: Story = {
    render: () => {
        const [currency, setCurrency] = useState("USD");

        return (
            <div className="w-80">
                <InputTextField
                    label="Sale amount"
                    defaultValue="1,000.00"
                    leftIcon={<DollarSign />}
                    rightIcon={currency}
                    helperText="This is a hint text to help user."
                    showDropdown
                    dropdownOptions={["USD", "EUR", "GBP", "JPY"]}
                    dropdownValue={currency}
                    onDropdownSelect={setCurrency}
                    inputMode="numeric"
                    allowedPattern={/^[0-9,\.]*$/}
                />
            </div>
        );
    },
};


export const WebsiteEmpty: Story = {
    render: () => (
        <div className="w-80">
            <InputTextField
                label="Website"
                placeholder="www.untitledui.com"
                leftIcon="http://"
                rightIcon={<Info />}
                helperText="This is a hint text to help user."
            />
        </div>
    ),
};

export const WebsiteFilled: Story = {
    render: () => (
        <div className="w-80">
            <InputTextField
                label="Website"
                defaultValue="www.untitledui.com"
                leftIcon="http://"
                rightIcon={<Info />}
                helperText="This is a hint text to help user."
            />
        </div>
    ),
};

export const WebsiteCopy: Story = {
    render: () => {
        const [copied, setCopied] = useState(false);

        return (
            <div className="w-80">
                <InputTextField
                    label="Website"
                    defaultValue="www.untitledui.com"
                    leftIcon="http://"
                    showCopyButton={true}
                    onCopy={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                />
                {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
            </div>
        );
    },
};


export const CardNumberEmpty: Story = {
    render: () => (
        <div className="w-80">
            <InputTextField
                label="Card number"
                placeholder="Card number"
                leftIcon={<CreditCard className="text-orange-500" />}
                rightIcon={<Info />}
                helperText="This is a hint text to help user."
                inputMode="numeric"
                allowedPattern={/^[0-9\s]*$/}
            />
        </div>
    ),
};


export const UsersWithTags: Story = {
    render: () => {
        const [tags, setTags] = useState([
            { id: "1", label: "Olivia", icon: <User /> },
            { id: "2", label: "Phoenix", icon: <User /> },
            { id: "3", label: "Lana" },
        ]);

        return (
            <div className="w-80">
                <InputTextField
                    label="Users"
                    placeholder="Add users"
                    rightIcon={<Info />}
                    helperText="This is a hint text to help user."
                    tags={tags}
                    onTagRemove={(id) => setTags(tags.filter((t) => t.id !== id))}
                />
            </div>
        );
    },
};
