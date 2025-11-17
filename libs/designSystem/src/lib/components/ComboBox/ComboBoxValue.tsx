import { Text } from "react-aria-components";
import { baseStyles } from "./Style";

export function ComboBoxValue() {
    return <Text slot="value" className={baseStyles.value} />;
}