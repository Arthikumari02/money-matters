import React from "react";

export class IconDetector {
    static findIcon(
        children: React.ReactNode,
        iconType: React.ComponentType<any> | React.FC<any>
    ): React.ReactNode | undefined {
        return React.Children.toArray(children).find(
            (child) => React.isValidElement(child) && child.type === iconType
        );
    }

    static hasIcon(children: React.ReactNode, iconType: React.ComponentType<any> | React.FC<any>): boolean {
        return !!this.findIcon(children, iconType);
    }

    static extractIcons(
        children: React.ReactNode,
        leftIconType: React.ComponentType<any> | React.FC<any>,
        rightIconType: React.ComponentType<any> | React.FC<any>
    ) {
        const childrenArray = React.Children.toArray(children);

        const leftIcon = childrenArray.find(
            (child) => React.isValidElement(child) && child.type === leftIconType
        );

        const rightIcon = childrenArray.find(
            (child) => React.isValidElement(child) && child.type === rightIconType
        );

        return { leftIcon, rightIcon };
    }
}