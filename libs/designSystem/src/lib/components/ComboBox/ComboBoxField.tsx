import { ComboBox, Label, ListBox, Text, Group } from "react-aria-components";
import { ComboBoxContext } from "./ComboBoxContext";
import { ComboBoxFieldProps } from "./Types";
import { ComboBoxTrigger } from "./ComboBoxTrigger";
import { ComboBoxOption } from "./ComboBoxOption";
import { ComboBoxValue } from "./ComboBoxValue";
import clsx from "clsx";

export function ComboBoxField({
    children,
    size = "md",
    isDisabled,
    isInvalid,
    isRequired,
    customIcons,
    label,
    className,
    value,
    defaultValue,
    onChange
}: ComboBoxFieldProps) {

    return (
        <ComboBoxContext.Provider value={{ size, isInvalid, isDisabled, isRequired, customIcons }}>
            <ComboBox
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isRequired={isRequired}
                defaultSelectedKey={defaultValue}
                selectedKey={value}
                onSelectionChange={onChange}
                className={className}
            >

                {label && <Label>{label}</Label>}

                {children}

            </ComboBox>

        </ComboBoxContext.Provider>
    );
}

ComboBoxField.Trigger = ComboBoxTrigger;
ComboBoxField.Option = ComboBoxOption;
ComboBoxField.Content = ListBox;
ComboBoxField.Value = ComboBoxValue;
ComboBoxField.Group = Group;
ComboBoxField.Content = ListBox;
ComboBoxField.Value = ComboBoxValue;
ComboBoxField.RightIcon = ComboBoxTrigger.RightIcon;
ComboBoxField.LeftIcon = ComboBoxTrigger.LeftIcon;

ComboBoxField.Helper = ({ children }) => (
    <Text slot="description" className="text-xs text-gray-500">
        {children}
    </Text>
);

ComboBoxField.Error = ({ children }) => (
    <Text slot="errorMessage" className="text-xs text-red-500">
        {children}
    </Text>
);
