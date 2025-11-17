import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";
import type { Key, ReactNode } from "react";
import clsx from "clsx";
import { comboBoxOptionStyles } from "./Style";
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
                    comboBoxOptionStyles.base,
                    isFocused && comboBoxOptionStyles.focused,
                    !isFocused && isHovered && comboBoxOptionStyles.hovered,
                    isSelected && comboBoxOptionStyles.selected
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
                            <div className={comboBoxOptionStyles.content}>
                                {children(renderProps)}
                            </div>
                            {renderProps.isSelected && (
                                <span className={comboBoxOptionStyles.checkmark}>✓</span>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={comboBoxOptionStyles.content}>
                                {children}
                            </div>
                            {renderProps.isSelected && (
                                <span className={comboBoxOptionStyles.checkmark}>✓</span>
                            )}
                        </>
                    )}
                </>
            )}
        </ListBoxItem>
    );
}