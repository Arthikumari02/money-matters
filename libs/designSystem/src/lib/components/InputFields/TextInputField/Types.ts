import { BaseInputFieldProps } from "../BaseInputFieldProps";

export interface TextInputFieldProps extends BaseInputFieldProps {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

