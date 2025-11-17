import type { Size } from "./types";

export const sizeStyles: Record<Size, string> = {
    sm: "text-sm py-2 px-3",
    md: "text-base py-3 px-4",
    lg: "text-lg py-4 px-5",
};

export const iconSizes: Record<Size, number> = {
    sm: 16,
    md: 18,
    lg: 20,
};

export const contentStyles = "px-7 pb-4 pt-1 text-sm text-gray-700";
export const triggerBaseStyles = "w-full flex items-center gap-1 transition-colors font-medium";
export const leftIconStyles = "flex items-center";
export const rightIconStyles = "flex items-center ml-auto";
export const chevronBaseStyles = "transition-transform duration-200 group-data-[expanded]:rotate-90";