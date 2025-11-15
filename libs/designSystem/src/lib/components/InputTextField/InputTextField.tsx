import {
    TextField,
    Label,
    Input,
    Button,
    Text,
    Popover,
    ListBox,
    ListBoxItem,
    TagGroup,
    TagList,
    Tag as RaTag,
} from "react-aria-components";
import { ChevronDown, Copy, X } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

export interface Tag {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

export interface InputTextFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    type?: "text" | "email" | "password" | "number" | "url" | "tel";
    size?: "xs" | "sm" | "md" | "lg";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    helperText?: string;
    errorText?: string;
    isDisabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;

    showDropdown?: boolean;
    dropdownOptions?: string[];
    dropdownValue?: string;
    onDropdownSelect?: (value: string) => void;

    tags?: Tag[];
    onTagRemove?: (tagId: string) => void;

    showCopyButton?: boolean;
    onCopy?: () => void;

    allowedPattern?: RegExp;
    inputMode?: "text" | "numeric" | "email" | "tel";

    className?: string;
}

const sizeMap = {
    xs: "h-8 text-xs",
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-11 text-base",
};

export const InputTextField: React.FC<InputTextFieldProps> = ({
    label,
    placeholder,
    value,
    defaultValue,
    onChange,
    type = "text",
    size = "md",
    leftIcon,
    rightIcon,
    helperText,
    errorText,
    isDisabled,
    onFocus,
    onBlur,
    showDropdown = false,
    dropdownOptions = [],
    dropdownValue,
    onDropdownSelect,
    tags = [],
    onTagRemove,
    allowedPattern,
    inputMode,
    showCopyButton = false,
    onCopy,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TextField
            className={clsx("flex flex-col gap-1.5 w-full", className)}
            isDisabled={isDisabled}
            value={value}
            defaultValue={defaultValue}
            onChange={(v) => {
                if (allowedPattern && v && !allowedPattern.test(v)) return;
                onChange?.(v);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {label && <Label className="text-sm font-medium text-gray-900">{label}</Label>}

            <div
                className={clsx(
                    "flex items-center gap-2 border rounded-lg bg-white transition-all px-3",
                    sizeMap[size],
                    {
                        "border-gray-300": !errorText,
                        "border-red-500": errorText,
                        "opacity-50 cursor-not-allowed bg-gray-50": isDisabled,
                    }
                )}
            >
                {leftIcon && <span className="text-gray-500">{leftIcon}</span>}

                {tags.length > 0 && (
                    <TagGroup
                        selectionMode="none"
                        className="flex gap-1"
                        aria-label="Selected tags"
                    >
                        <TagList items={tags}>
                            {(tag) => (
                                <RaTag
                                    id={tag.id}
                                    className="flex items-center gap-1 bg-[#FFFFFF] border border-[#D0D5DD] px-2 py-1 rounded text-xs"
                                >
                                    {tag.icon}
                                    {tag.label}
                                    {onTagRemove && (
                                        <Button
                                            slot="remove"
                                            onPress={() => onTagRemove(tag.id)}
                                            className="ml-1 text-[#344054] hover:text-[#344054]"
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    )}
                                </RaTag>
                            )}
                        </TagList>
                    </TagGroup>
                )}

                <Input
                    type={type}
                    placeholder={placeholder}
                    inputMode={inputMode}
                    value={value}
                    className={clsx(
                        "flex-1 outline-none bg-transparent placeholder:text-gray-400",
                        (value) ? "text-gray-900 font-medium" : "text-gray-500"
                    )}
                />

                {showCopyButton && value && (
                    <Button
                        onPress={() => {
                            navigator.clipboard.writeText(value);
                            onCopy?.();
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                )}

                {showDropdown && dropdownOptions.length > 0 ? (
                    <>
                        <Button onPress={() => setIsOpen(true)} className="text-gray-600 flex items-center">
                            {dropdownValue}
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>

                        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                            <ListBox
                                selectionMode="single"
                                selectedKeys={[dropdownValue ?? ""]}
                                onSelectionChange={(keys) => {
                                    const val = Array.from(keys)[0] as string;
                                    onDropdownSelect?.(val);
                                    setIsOpen(false);
                                }}
                                className="bg-white shadow-md border rounded-md p-1 w-full"
                            >
                                {dropdownOptions.map((opt) => (
                                    <ListBoxItem
                                        key={opt}
                                        id={opt}
                                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
                                    >
                                        {opt}
                                    </ListBoxItem>
                                ))}
                            </ListBox>
                        </Popover>
                    </>
                ) : rightIcon ? (
                    <span className="text-gray-500">{rightIcon}</span>
                ) : null}
            </div>

            {errorText ? (
                <Text slot="errorMessage" className="text-xs text-red-500">{errorText}</Text>
            ) : helperText ? (
                <Text slot="description" className="text-xs text-gray-600">{helperText}</Text>
            ) : null}
        </TextField>
    );
};
