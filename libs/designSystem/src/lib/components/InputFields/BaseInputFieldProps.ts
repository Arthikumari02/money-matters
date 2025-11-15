import React from "react";

export interface BaseInputFieldProps {
    size?: "xs" | "sm" | "md";
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    className?: string;
    customIcons?: {
        invalid?: React.ReactNode;
        required?: React.ReactNode;
    };
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    className?: string;
}

export interface LabelProps {
    children: React.ReactNode;
    className?: string;
}

export interface IconProps {
    children: React.ReactNode;
    className?: string;
}

export interface TextProps {
    children: React.ReactNode;
}