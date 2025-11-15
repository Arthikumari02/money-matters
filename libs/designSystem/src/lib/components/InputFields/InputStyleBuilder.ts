import clsx from "clsx";

export const sizeMap = {
    xs: "text-xs px-3 py-2",
    sm: "text-sm px-4 py-2.5",
    md: "text-base px-5 py-2.5",
};

export class InputStyleBuilder {
    static getContainerStyles(
        size: "xs" | "sm" | "md",
        isInvalid: boolean,
        className?: string
    ): string {
        return clsx(
            "flex items-center gap-2 border rounded-lg bg-white w-full",
            "transition-colors duration-200",
            isInvalid
                ? "border-red-300 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500"
                : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
            sizeMap[size],
            "px-3",
            className
        );
    }

    static getInputStyles(
        hasLeftIcon: boolean,
        hasRightIcon: boolean,
        className?: string
    ): string {
        return clsx(
            "border-0 outline-none bg-transparent w-full flex-1",
            hasLeftIcon && "pl-2",
            hasRightIcon && "pr-2",
            !hasLeftIcon && !hasRightIcon && "px-3",
            "placeholder:text-gray-400",
            className
        );
    }

    static getIconContainerStyles(className?: string): string {
        return clsx("flex items-center justify-center shrink-0", className);
    }
}