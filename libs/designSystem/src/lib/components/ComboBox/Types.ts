import React from "react";

export interface BaseProps {
    size?: "xs" | "sm" | "md";
    isInvalid?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    customIcons?: {
        invalid?: React.ReactNode;
        required?: React.ReactNode;
    };
}

export interface ComboBoxFieldProps extends BaseProps {
    children: React.ReactNode;
    label?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    className?: string;
}

export interface TriggerProps {
    children?: React.ReactNode;
    className?: string;
}

export interface OptionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export interface IconProps {
    children: React.ReactNode;
    className?: string;
}
