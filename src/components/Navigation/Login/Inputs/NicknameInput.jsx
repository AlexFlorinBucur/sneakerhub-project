import { HiOutlineUserCircle } from "react-icons/hi";
import Input from "../../../UI/Input";
import classes from "./RepetitiveInput.module.css";

const NicknameInput = ({
  nicknameValue,
  nicknameHasError,
  nicknameChangedHandler,
  nicknameBlurHandler,
}) => {
  return (
    <Input
      input={{
        type: "text",
        id: "nickname",
        required: "required",
        value: nicknameValue,
        onChange: nicknameChangedHandler,
        onBlur: nicknameBlurHandler,
      }}
      label={{
        htmlFor: "nickname",
        text: "Nickname",
      }}
      hasSvg={<HiOutlineUserCircle />}
      hasError={nicknameHasError}
      errorMsg={nicknameHasError && "Nickname should be at least 3 characters"}
      inputValidityClass={classes.invalid}
    />
  );
};

export default NicknameInput;
