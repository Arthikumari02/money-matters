import React, { createContext, useContext } from "react";
import {
    Disclosure as AriaDisclosure,
    Button,
    DisclosurePanel
} from "react-aria-components";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

import {
    sizeStyles,
    iconSizes,
    contentStyles,
    triggerBaseStyles,
    leftIconStyles,
    rightIconStyles,
    chevronBaseStyles,
} from "./Styles";

import type {
    DisclosureProps,
    TriggerProps,
    IconProps,
    ChevronProps,
    ContentProps,
    TitleProps,
    DisclosureContextValue,
} from "./types";

const DisclosureContext = createContext<DisclosureContextValue | null>(null);

const useDisclosureContext = () => {
    const ctx = useContext(DisclosureContext);
    if (!ctx)
        throw new Error("Disclosure subcomponents must be used inside <Disclosure>");
    return ctx;
};

const Disclosure = ({
    children,
    size = "md",
    className,
    ...props
}: DisclosureProps) => {
    return (
        <DisclosureContext.Provider value={{ size }}>
            <AriaDisclosure {...props} className={clsx("group rounded-md", className)}>
                {children}
            </AriaDisclosure>
        </DisclosureContext.Provider>
    );
}

const Trigger = ({ children, className }: TriggerProps) => {
    const { size } = useDisclosureContext();

    return (
        <Button
            slot="trigger"
            className={clsx(triggerBaseStyles, sizeStyles[size], className)}
        >
            {children}
        </Button>
    );
}

const Chevron = ({ position = "left", className }: ChevronProps) => {
    const { size } = useDisclosureContext();

    return (
        <ChevronRight
            size={iconSizes[size]}
            className={clsx(
                chevronBaseStyles,
                position === "right" ? rightIconStyles : leftIconStyles,
                className
            )}
        />
    );
}

const LeftIcon = ({ children, className }: IconProps) => {
    return <span className={clsx(leftIconStyles, className)}>{children}</span>;
}

const RightIcon = ({ children, className }: IconProps) => {
    return <span className={clsx(rightIconStyles, className)}>{children}</span>;
}

const Title = ({ children, className }: TitleProps) => {
    return <span className={className}>{children}</span>;
}

const Content = ({ children, className }: ContentProps) => {
    return (
        <DisclosurePanel className={clsx(contentStyles, className)}>
            {children}
        </DisclosurePanel>
    );
}

Disclosure.Trigger = Trigger;
Disclosure.Chevron = Chevron;
Disclosure.LeftIcon = LeftIcon;
Disclosure.RightIcon = RightIcon;
Disclosure.Title = Title;
Disclosure.Content = Content;

export default Disclosure;
