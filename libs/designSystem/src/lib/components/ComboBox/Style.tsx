import type { Size } from "./ComboBoxContext";

export const baseStyles = {
    button: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-500",

    option: {
        base: "flex items-center justify-between px-3 py-2 text-sm cursor-pointer select-none rounded-md",
        hover: "hover:bg-gray-100",
        focus: "focus:bg-gray-200",
        selected: "bg-blue-50 text-blue-700",
        content: "flex items-center gap-2 flex-1",
        checkmark: "text-blue-600 ml-2"
    },

    value: "text-sm",

    field: {
        container: "flex flex-col gap-1 w-64",
        label: "text-sm font-medium text-gray-700",
        input: "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100",
        description: "text-xs text-gray-500",
        error: "text-xs text-red-600",
        popover: "w-[--trigger-width]",
        listBox: "max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    },

    group: "relative",

    sizes: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base"
    },

    states: {
        disabled: "opacity-50 cursor-not-allowed",
        invalid: "border-red-500 focus:ring-red-500",
        required: "border-yellow-500 focus:ring-yellow-500"
    }
} as const;

export const getSizeClass = (size: Size = 'md'): string => {
    const sizeMap: Record<Size, string> = {
        xs: baseStyles.sizes.xs,
        sm: baseStyles.sizes.sm,
        md: baseStyles.sizes.md,
        lg: baseStyles.sizes.md
    };
    return sizeMap[size];
};

export const getOptionClasses = (state: {
    isFocused: boolean;
    isHovered: boolean;
    isSelected: boolean;
}): string => {
    const { isFocused, isHovered, isSelected } = state;
    let classes = baseStyles.option.base;

    if (isHovered) classes += ` ${baseStyles.option.hover}`;
    if (isFocused) classes += ` ${baseStyles.option.focus}`;
    if (isSelected) classes += ` ${baseStyles.option.selected}`;

    return classes;
};

export const getFieldClasses = (className?: string) => {
    return `${baseStyles.field.container} ${className || ''}`.trim();
};

export default baseStyles;
