import { ListBoxItem, ListBoxItemProps } from "react-aria-components";
import { Key, ReactNode } from "react";

export interface ComboBoxOptionProps extends Omit<ListBoxItemProps, 'id' | 'children'> {
    id?: Key;
    children: ReactNode;
    className?: string;
}

export function ComboBoxOption({ id, children, className = '', ...props }: ComboBoxOptionProps) {
    return (
        <ListBoxItem
            key={id}
            className={`cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md ${className}`}
            {...props}
        >
            {children}
        </ListBoxItem>
    );
}
