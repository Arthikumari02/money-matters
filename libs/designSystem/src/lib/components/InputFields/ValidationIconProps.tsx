import React from "react";
import { ValidationIconResolver } from "./ValidationIconResolver";

interface ValidationIconProps {
    isInvalid?: boolean;
    isRequired?: boolean;
    customIcons?: {
        invalid?: React.ReactNode;
        required?: React.ReactNode;
    };
}

export function ValidationIcon({ isInvalid, isRequired, customIcons }: ValidationIconProps) {
    return <>{ValidationIconResolver.resolve(isInvalid, isRequired, customIcons)} </>;
}