import { Button } from "react-aria-components";
import { AiOutlineDown } from "react-icons/ai";
import { useComboBoxContext } from "./ComboBoxContext";
import { baseStyles } from "./Style";

export function ComboBoxTrigger() {
    const { isDisabled } = useComboBoxContext();

    return (
        <Button
            className={baseStyles.button}
            isDisabled={isDisabled}
        >
            <AiOutlineDown size={16} />
        </Button>
    );
}