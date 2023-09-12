import { RiLockPasswordLine } from "react-icons/ri";

import Input from "../../../UI/Input";
import classes from "./RepetitiveInput.module.css";

const ConfirmPasswordInput = ({
  confirmPasswordValue,
  confirmPasswordHasError,
  confirmPasswordChangedHandler,
  confirmPasswordBlurHandler,
  passwordMatch,
}) => {
  const confirmPasswordInputClasses = confirmPasswordHasError
    ? classes.invalid
    : "";

  return (
    <Input
      input={{
        type: "password",
        id: "password-confirm",
        required: "required",
        value: confirmPasswordValue,
        onChange: confirmPasswordChangedHandler,
        onBlur: confirmPasswordBlurHandler,
      }}
      label={{
        htmlFor: "password-confirm",
        text: "Confirm Password",
      }}
      hasSvg={<RiLockPasswordLine />}
      hasError={!passwordMatch && confirmPasswordHasError}
      errorMsg={"Password don't match!"}
      inputValidityClass={confirmPasswordInputClasses}
    />
  );
};

export default ConfirmPasswordInput;
