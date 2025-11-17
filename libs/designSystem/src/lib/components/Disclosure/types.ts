import type { DisclosureProps as AriaDisclosureProps } from "react-aria-components";
import type { ReactNode } from "react";

export type Size = "sm" | "md" | "lg";

export interface DisclosureContextValue {
    size: Size;
}

export interface DisclosureProps extends Omit<AriaDisclosureProps, "children"> {
    children: ReactNode;
    size?: Size;
    className?: string;
}

export interface TriggerProps {
    children: ReactNode;
    className?: string;
}

export interface IconProps {
    children: ReactNode;
    className?: string;
}

export interface ChevronProps {
    position?: "left" | "right";
    className?: string;
}

export interface ContentProps {
    children: ReactNode;
    className?: string;
}

export interface TitleProps {
    children: ReactNode;
    className?: string;
}