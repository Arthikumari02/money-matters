import clsx from "clsx";

export const sizeMap = {
    xs: "text-xs py-1 px-2",
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-3",
    lg: "text-lg py-3 px-4",
};

export class InputStyleBuilder {
    static container(size: "xs" | "sm" | "md" | "lg" = "md", isInvalid?: boolean, className?: string) {
        return clsx(
            "flex items-center gap-2 rounded-md border transition-all bg-white",
            sizeMap[size],
            isInvalid
                ? "border-red-300 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500"
                : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
            className
        );
    }

    static input(hasLeft: boolean, hasRight: boolean) {
        return clsx(
            "flex-1 bg-transparent outline-none border-none",
            hasLeft && "pl-1",
            hasRight && "pr-1",
            "placeholder:text-gray-400"
        );
    }

    static icon = "flex items-center justify-center shrink-0 text-gray-500";
}
