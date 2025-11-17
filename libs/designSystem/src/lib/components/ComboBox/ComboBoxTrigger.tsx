import { Input, Group } from "react-aria-components";
import { useComboBoxContext } from "./ComboBoxContext";
import { InputStyleBuilder } from "./helpers/InputStyleBuilder";
import { IconDetector } from "../helpers/IconDetector";
import { ValidationIconResolver } from "../helpers/ValidationIconResolver";
import { IconProps } from "./Types";

interface ComboBoxTriggerProps {
    children?: React.ReactNode;
    className?: string;
}

export function ComboBoxTrigger({ children, className = '' }: ComboBoxTriggerProps) {
    const { size, isInvalid, isRequired, customIcons } = useComboBoxContext();

    const { leftIcon, rightIcon } = IconDetector.extractIcons(
        children,
        ComboBoxTrigger.LeftIcon,
        ComboBoxTrigger.RightIcon
    );

    const showValidationIcon = ValidationIconResolver.shouldShow(isInvalid, isRequired);
    const effectiveRight = showValidationIcon
        ? ValidationIconResolver.resolve(isInvalid, isRequired, customIcons)
        : rightIcon;

    return (
        <Group className={InputStyleBuilder.container(size, isInvalid, className)}>

            {leftIcon && (
                <span className={InputStyleBuilder.icon}>
                    {leftIcon}
                </span>
            )}

            <Input className={InputStyleBuilder.input(!!leftIcon, !!effectiveRight)} />

            {effectiveRight && (
                <span className={InputStyleBuilder.icon}>
                    {effectiveRight}
                </span>
            )}

        </Group>
    );
}

ComboBoxTrigger.LeftIcon = function LeftIcon({ children, className = '' }: IconProps) {
    return <span className={className}>{children}</span>;
};

ComboBoxTrigger.RightIcon = function RightIcon({ children, className = '' }: IconProps) {
    return <span className={className}>{children}</span>;
};
