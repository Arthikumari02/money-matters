import { createContext, useContext } from "react";

export interface FieldContextType {
    size: "xs" | "sm" | "md";
    isDisabled: boolean;
    isInvalid: boolean;
    isRequired: boolean;
    customIcons?: {
        invalid?: React.ReactNode;
        required?: React.ReactNode;
    };
}

export const FieldContext = createContext<FieldContextType | null>(null);

export const useFieldContext = () => {
    const ctx = useContext(FieldContext);
    if (!ctx) {
        throw new Error("Field components must be used inside FieldContext.Provider");
    }
    return ctx;
};