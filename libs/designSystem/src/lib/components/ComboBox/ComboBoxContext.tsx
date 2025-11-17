import { createContext, useContext } from "react";

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface ComboBoxContextType {
    size?: Size;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    isSelected?: boolean;
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