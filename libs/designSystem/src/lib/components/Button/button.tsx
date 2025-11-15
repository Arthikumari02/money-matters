import React, { createContext, useContext } from "react";
import { Button as AriaButton, ButtonProps } from "react-aria-components";
import { getLoaderSize, getVariant } from "../../utils/getButtonStyles";
import { cn } from "../../utils/helpers";


const ButtonSizeContext = createContext("md");

export const Button = ({
  size = "md",
  variant = "solid",
  intent = "primary",
  children,
  ...props
}: ButtonProps & {
  size?: string;
  variant?: string;
  intent?: string;
}) => {
  return (
    <ButtonSizeContext.Provider value={size}>
      <AriaButton
        {...props}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 gap-2 disabled:cursor-not-allowed",
          getVariant(variant, intent, size)
        )}
      >
        {children}
      </AriaButton>
    </ButtonSizeContext.Provider>
  );
};

const Icon = ({ children }: { children: React.ReactNode }) => {
  const size = useContext(ButtonSizeContext);

  return (
    <span style={{ fontSize: size }}>
      {children}
    </span>
  );
};

const Text = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>;
};

const Loader = () => {
  const size = useContext(ButtonSizeContext);

  return (
    <div
      style={{ width: getLoaderSize(size), height: getLoaderSize(size) }}
      className="animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
};

Button.Loader = Loader;
Button.Icon = Icon;
Button.Text = Text;

Button.Primary = (props: ButtonProps & {
  size?: string;
  variant?: string;
}) => <Button intent="primary" {...props} />;

Button.Danger = (props: ButtonProps & {
  size?: string;
  variant?: string;
}) => <Button intent="destructive" {...props} />;

export default Button;