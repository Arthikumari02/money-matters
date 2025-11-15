export const getLoaderSize = (size: string) => {
    switch (size) {
        case 'xs':
            return 12;
        case 'sm':
            return 16;
        case 'md':
            return 18;
        case 'lg':
            return 20;
        case 'xl':
            return 24;
        case '2xl':
            return 28;
        default:
            return 16;
    }
};


const intents = {
    primary: {
        bg: "[#1570EF]",
        bgHover: "[#175CD3]",
        bgFocus: "[#D1E9FF]",
        text: "white",
        border: "[#1570EF]",
        outlineBorder: "[#84CAFF]",
        linkHoverBg: "[#EFF8FF]",
        linkText: "[#1849A9]",
        disabledbg: "[#F2F4F7]",
        disabledText: "[#98A2B3]",
        disabledBorder: "[#F2F4F7]",
    },
    destructive: {
        bg: "[#D92D20]",
        bgHover: "[#B42318]",
        bgFocus: "[#F044383D]",
        text: "white",
        border: "[#D92D20]",
        outlineBorder: "[#FDA29B]",
        linkHoverBg: "[#FEF3F2]",
        linkText: "[#B42318]",
    },
    neutral: {
        bg: "transparent",
        bgHover: "[#F9FAFB]",
        bgFocus: "[#98A2B324]",
        text: "[#182230]",
        border: "[#D0D5DD]",
        outlineBorder: "[#D0D5DD]",
        linkHoverBg: "[#F2F4F7]",
        linkText: "[#182230]",
    },
};

const getButtonSizeClasses = (size: string) => {
    switch (size) {
        case 'xs':
            return 'text-xs px-[8px] py-[5px] h-[28px]';
        case 'sm':
            return 'text-sm px-[12px] py-[8px] h-[36px]';
        case 'md':
            return 'text-base px-[14px] py-[10px] h-[40px]';
        case 'lg':
            return 'text-lg px-[16px] py-[12px] h-[44px]';
        case 'xl':
            return 'text-xl px-[18px] py-[14px] h-[48px]';
        case '2xl':
            return 'text-2xl px-[22px] py-[18px] h-[60px]';
        default:
            return 'text-base px-[14px] py-[10px] h-[40px]';
    }
}

export const getVariant = (variant: string, intent: string, size: string) => {
    const c = intents[intent as keyof typeof intents];
    if (!c) return "";

    switch (variant) {
        case "solid":
            return `bg-${c.bg} border border-${c.border} 
            text-${c.text} 
            hover:bg-${c.bgHover} focus:ring-${c.bgFocus} focus:ring-2 focus:ring-offset-2
            disabled:bg-[#F2F4F7] disabled:text-[#98A2B3] disabled:border disabled:border-[#EAECF0]
            ${getButtonSizeClasses(size)}`;

        case "outline":
            return `border border-${c.outlineBorder}
             text-${c.linkText} 
             hover:bg-${c.linkHoverBg} focus:ring-${c.bgFocus} focus:ring-2 focus:ring-offset-2
             disabled:bg-[transparent] disabled:text-[#98A2B3] disabled:border disabled:border-[#EAECF0]
              ${getButtonSizeClasses(size)}`;

        case "link":
            return `text-${c.linkText} hover:bg-${c.linkHoverBg} 
            disabled:bg-[transparent] disabled:text-[#98A2B3]
             ${getButtonSizeClasses(size)}`;

        case "ghost":
            return `text-${c.linkText}
            disabled:bg-[transparent] disabled:text-[#98A2B3]
             ${getButtonSizeClasses(size)}`;

        default:
            return "";
    }
};
