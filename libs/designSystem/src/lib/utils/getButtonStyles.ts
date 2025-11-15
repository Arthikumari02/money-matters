export const getLoaderSize = (size: string) => {
    switch (size) {
        case "xs":
            return 12;
        case "sm":
            return 16;
        case "md":
            return 18;
        case "lg":
            return 20;
        case "xl":
            return 24;
        case "2xl":
            return 28;
        default:
            return 16;
    }
};

export const intents = {
    primary: {
        solid: {
            bg: "bg-[#1570EF]",
            text: "text-white",
            border: "border-[#1570EF]",
            hover: "hover:bg-[#175CD3]",
            ring: "focus:ring-[#D1E9FF] focus:ring-2 focus:ring-offset-2",
        },
        outline: {
            border: "border border-[#84CAFF]",
            text: "text-[#175CD3]",
            hover: "hover:bg-[#EFF8FF]",
            ring: "focus:ring-[#D1E9FF] focus:ring-2 focus:ring-offset-2",
        },
        link: {
            text: "text-[#175CD3]",
            hover: "hover:bg-[#EFF8FF]",
        },
        ghost: {
            text: "text-[#175CD3]",
        },
    },

    destructive: {
        solid: {
            bg: "bg-[#D92D20]",
            text: "text-white",
            border: "border-[#D92D20]",
            hover: "hover:bg-[#B42318]",
            ring: "focus:ring-[#F044383D] focus:ring-2 focus:ring-offset-2",
        },
        outline: {
            border: "border border-[#FDA29B]",
            text: "text-[#B42318]",
            hover: "hover:bg-[#FEF3F2]",
            ring: "focus:ring-[#F044383D] focus:ring-2 focus:ring-offset-2",
        },
        link: {
            text: "text-[#B42318]",
            hover: "hover:bg-[#FEF3F2]",
        },
        ghost: {
            text: "text-[#B42318]",
        },
    },

    neutral: {
        solid: {
            text: "text-[#182230]",
            border: "border border-[#D0D5DD]",
            hover: "hover:bg-[#D0D5DD]",
            ring: "focus:ring-[#98A2B324] focus:ring-2 focus:ring-offset-2",
        },
        outline: {
            border: "border border-[#D0D5DD]",
            text: "text-[#182230]",
            hover: "hover:bg-[#F2F4F7]",
            ring: "focus:ring-[#98A2B324] focus:ring-2 focus:ring-offset-2",
        },
        link: {
            text: "text-[#182230]",
            hover: "hover:bg-[#F2F4F7]",
        },
        ghost: {
            text: "text-[#182230]",
            hover: "hover:bg-[#F2F4F7]",
        },
    },
};


export const getButtonSizeClasses = (size: string) => {
    switch (size) {
        case "xs":
            return "text-xs px-[8px] py-[5px] h-[28px]";
        case "sm":
            return "text-sm px-[12px] py-[8px] h-[36px]";
        case "md":
            return "text-base px-[14px] py-[10px] h-[40px]";
        case "lg":
            return "text-lg px-[16px] py-[12px] h-[44px]";
        case "xl":
            return "text-xl px-[18px] py-[14px] h-[48px]";
        case "2xl":
            return "text-2xl px-[22px] py-[18px] h-[60px]";
        default:
            return "text-base px-[14px] py-[10px] h-[40px]";
    }
};


type ButtonStyle = {
    bg?: string;
    text: string;
    border?: string;
    hover: string;
    ring?: string;
};

export const getVariant = (
    variant: string,
    intent: string,
    size: string
) => {
    const intentStyles = intents[intent as keyof typeof intents];
    const style = intentStyles?.[variant as keyof typeof intentStyles] as ButtonStyle | undefined;

    if (!style) return ""

    return `
    ${style.bg ?? ""}
    ${style.border ?? ""}
    ${style.text ?? ""}
    ${style.hover ?? ""}
    ${style.ring ?? ""}
    disabled:bg-[#F2F4F7]
    disabled:text-[#98A2B3]
    disabled:border-[#EAECF0]
    ${getButtonSizeClasses(size)}
  `;
};
