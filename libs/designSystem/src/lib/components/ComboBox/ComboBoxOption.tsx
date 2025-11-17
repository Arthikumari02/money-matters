import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";
import type { Key, ReactNode } from "react";
import clsx from "clsx";

export interface ComboBoxOptionProps extends Omit<ListBoxItemProps, "id"> {
    id: Key;
    children: ReactNode | ((renderProps: { isSelected: boolean; isFocused: boolean; isHovered: boolean; isPressed: boolean; isDisabled: boolean }) => ReactNode);
    className?: string | ((state: { isFocused: boolean; isSelected: boolean; isHovered: boolean }) => string);
}

export function ComboBoxOption({ id, children, className, ...props }: ComboBoxOptionProps) {
    return (
        <ListBoxItem
            id={id}
            {...props}
            className={(renderProps) => {
                const { isFocused, isSelected, isHovered } = renderProps;

                const baseClass = clsx(
                    "flex items-center justify-between px-3 py-2 text-sm cursor-pointer select-none rounded-md transition-colors",
                    isFocused && "bg-gray-100",
                    !isFocused && isHovered && "bg-gray-50",
                    isSelected && "bg-blue-50 text-blue-700"
                );

                if (typeof className === 'function') {
                    return clsx(baseClass, className(renderProps));
                }

                return clsx(baseClass, className);
            }}
        >
            {(renderProps) => (
                <>
                    {typeof children === 'function' ? (
                        <>
                            <div className="flex items-center gap-2 flex-1">
                                {children(renderProps)}
                            </div>
                            {renderProps.isSelected && (
                                <span className="text-blue-600 ml-2">✓</span>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 flex-1">
                                {children}
                            </div>
                            {renderProps.isSelected && (
                                <span className="text-blue-600 ml-2">✓</span>
                            )}
                        </>
                    )}
                </>
            )}
        </ListBoxItem>
    );
}