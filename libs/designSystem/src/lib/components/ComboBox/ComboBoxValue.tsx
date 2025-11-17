import { Text, TextProps } from "react-aria-components";
import { ReactNode, ComponentProps } from "react";

export interface ComboBoxValueProps extends Omit<TextProps, 'children' | 'slot'> {
    children?: ReactNode;
    render?: (item: ReactNode) => ReactNode;
    className?: string;
}

export function ComboBoxValue({
    children,
    render,
    className = '',
    ...props
}: ComboBoxValueProps) {
    if (render) {
        return (
            <div
                className={className}
                {...props as ComponentProps<'div'>}
            >
                {render(children)}
            </div>
        );
    }

    return (
        <Text
            className={className}
            {...props as TextProps}
        >
            {children}
        </Text>
    );
}
