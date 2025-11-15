import {
    TextField as AriaTextField,
    Label,
    Input,
    Group,
    Text
} from "react-aria-components";

import clsx from "clsx";
import { FieldContext, useFieldContext } from "../FieldContext";
import { ValidationIcon } from "../ValidationIconProps";
import { InputStyleBuilder } from "../InputStyleBuilder";
import { IconDetector } from "../IconDetector";
import { ValidationIconResolver } from "../ValidationIconResolver";

import { TextInputFieldProps } from "./Types";
import { LabelProps, IconProps, InputProps, TextProps } from "../BaseInputFieldProps";

export function TextInputField({
    children,
    size = "md",
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    value,
    defaultValue,
    onChange,
    className,
    customIcons
}: TextInputFieldProps) {

    const contextValue = {
        size,
        isDisabled,
        isInvalid,
        isRequired,
        customIcons
    };

    return (
        <FieldContext.Provider value={contextValue}>
            <AriaTextField
                value={value}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isRequired={isRequired}
                onChange={onChange}
                className={clsx("flex flex-col gap-1 w-full", className)}
            >
                {children}
            </AriaTextField>
        </FieldContext.Provider>
    );
}

TextInputField.Label = function TextLabel({ children, className }: LabelProps) {
    return (
        <Label className={clsx(
            "text-sm font-medium text-gray-700 flex justify-between",
            className
        )}>
            {children}
        </Label>
    );
};

TextInputField.LeftIcon = function LeftIcon({ children, className }: IconProps) {
    return <div className={clsx("text-gray-400", className)}>{children}</div>;
};

TextInputField.RightIcon = function RightIcon({ children, className }: IconProps) {
    return <div className={clsx("text-gray-400", className)}>{children}</div>;
};

TextInputField.Input = function FieldInput({
    children,
    className,
    ...props
}: InputProps) {

    const { size, isInvalid, isRequired, customIcons } = useFieldContext();

    const { leftIcon, rightIcon } = IconDetector.extractIcons(
        children,
        TextInputField.LeftIcon,
        TextInputField.RightIcon
    );

    const hasValidationIcon = ValidationIconResolver.shouldShow(
        isInvalid,
        isRequired
    );

    const effectiveRightIcon = hasValidationIcon ? (
        <ValidationIcon
            isInvalid={isInvalid}
            isRequired={isRequired}
            customIcons={customIcons}
        />
    ) : rightIcon;

    return (
        <Group className={InputStyleBuilder.getContainerStyles(size, isInvalid, className)}>
            {leftIcon && (
                <div className={InputStyleBuilder.getIconContainerStyles()}>
                    {leftIcon}
                </div>
            )}

            <Input
                {...props}
                className={InputStyleBuilder.getInputStyles(
                    !!leftIcon,
                    !!effectiveRightIcon
                )}
            />

            {effectiveRightIcon && (
                <div className={InputStyleBuilder.getIconContainerStyles()}>
                    {effectiveRightIcon}
                </div>
            )}
        </Group >
    );
};

TextInputField.Error = function FieldError({ children }: TextProps) {
    return (
        <Text slot="errorMessage" className="text-xs text-red-500 font-medium mt-1">
            {children}
        </Text>
    );
};

TextInputField.Helper = function FieldHelper({ children }: TextProps) {
    return (
        <Text slot="description" className="text-xs text-gray-600">
            {children}
        </Text>
    );
};
