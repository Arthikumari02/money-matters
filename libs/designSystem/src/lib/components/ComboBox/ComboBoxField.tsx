import {
    ComboBox as AriaComboBox,
    Input,
    Label,
    ListBox,
    Popover,
    Text,
    Group,
    type Key
} from "react-aria-components";

import { ComboBoxContext } from "./ComboBoxContext";
import { ComboBoxOption } from "./ComboBoxOption";
import { ComboBoxTrigger } from "./ComboBoxTrigger";
import { ComboBoxValue } from "./ComboBoxValue";
import { baseStyles, getFieldClasses } from "./Style";

import type { ReactNode } from "react";

export interface ComboBoxFieldProps {
    children: ReactNode;
    label?: string;
    placeholder?: string;
    description?: string;
    errorMessage?: string;
    size?: "xs" | "sm" | "md";
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    value?: Key;
    defaultValue?: Key;
    onChange?: (key: Key | null) => void;
    onInputChange?: (value: string) => void;
    customIcons?: any;
    className?: string;
}

export function ComboBoxField({
    children,
    label,
    placeholder = "Select an option",
    description,
    errorMessage,
    size = "md",
    isDisabled,
    isInvalid,
    isRequired,
    value,
    defaultValue,
    onChange,
    onInputChange,
    customIcons,
    className
}: ComboBoxFieldProps) {
    return (
        <ComboBoxContext.Provider
            value={{ size, isDisabled, isInvalid, isRequired, customIcons }}
        >
            <AriaComboBox
                className={getFieldClasses(className)}
                selectedKey={value}
                defaultSelectedKey={defaultValue}
                onSelectionChange={onChange}
                onInputChange={onInputChange}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isRequired={isRequired}
                menuTrigger="focus"
            >
                {label && (
                    <Label className={baseStyles.field.label}>
                        {label}
                    </Label>
                )}

                <Group className={baseStyles.group}>
                    <Input
                        placeholder={placeholder}
                        className={baseStyles.field.input}
                    />
                    <ComboBoxTrigger />
                </Group>

                {description && !isInvalid && (
                    <Text slot="description" className={baseStyles.field.description}>
                        {description}
                    </Text>
                )}
                {isInvalid && errorMessage && (
                    <Text slot="errorMessage" className={baseStyles.field.error}>
                        {errorMessage}
                    </Text>
                )}

                <Popover className={baseStyles.field.popover}>
                    <ListBox
                        selectionMode="single"
                        className={baseStyles.field.listBox}
                    >
                        {children}
                    </ListBox>
                </Popover>
            </AriaComboBox>
        </ComboBoxContext.Provider>
    );
}

ComboBoxField.Option = ComboBoxOption;
ComboBoxField.Trigger = ComboBoxTrigger;
ComboBoxField.Value = ComboBoxValue;
ComboBoxField.Content = ListBox;

ComboBoxField.Helper = ({ children }: { children: ReactNode }) => (
    <Text slot="description" className="text-xs text-gray-500">
        {children}
    </Text>
);

ComboBoxField.Error = ({ children }: { children: ReactNode }) => (
    <Text slot="errorMessage" className="text-xs text-red-600">
        {children}
    </Text>
);

ComboBoxField.LeftIcon = ({ children }: { children: ReactNode }) => (
    <>{children}</>
);