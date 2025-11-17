import { AiOutlineQuestionCircle, AiFillExclamationCircle } from "react-icons/ai";

export class ValidationIconResolver {
  static resolve(isInvalid?: boolean, isRequired?: boolean, customIcons?: any) {
    if (isInvalid)
      return customIcons?.invalid || <AiFillExclamationCircle className="text-red-500 w-5 h-5" />;

    if (isRequired)
      return customIcons?.required || <AiOutlineQuestionCircle className="text-gray-400 w-5 h-5" />;

    return null;
  }

  static shouldShow(isInvalid?: boolean, isRequired?: boolean) {
    return !!(isInvalid || isRequired);
  }
}
