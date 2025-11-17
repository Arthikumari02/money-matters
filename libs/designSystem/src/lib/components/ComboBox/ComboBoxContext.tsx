import { createContext, useContext } from "react";

export interface ComboBoxContextType {
    size?: "xs" | "sm" | "md";
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    customIcons?: {
        invalid?: React.ReactNode;
        required?: React.ReactNode;
    };
}

export const ComboBoxContext = createContext<ComboBoxContextType | null>(null);

export const useComboBoxContext = () => {
    const ctx = useContext(ComboBoxContext);
    if (!ctx) throw new Error("ComboBoxField components must be inside <ComboBoxField>");
    return ctx;
};
