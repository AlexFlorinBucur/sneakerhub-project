import { RiLockPasswordLine } from "react-icons/ri";

import Input from "../../../UI/Input";
import classes from "./RepetitiveInput.module.css";

const PasswordInput = ({
  passwordValue,
  passwordHasError,
  passwordChangedHandler,
  passwordBlurHandler,
  errorPswMsg,
}) => {
  const passwordInputClasses = passwordHasError ? classes.invalid : "";

  return (
    <Input
      input={{
        type: "password",
        id: "password",
        required: "required",
        value: passwordValue,
        onChange: passwordChangedHandler,
        onBlur: passwordBlurHandler,
      }}
      label={{
        htmlFor: "password",
        text: "Password",
      }}
      hasSvg={<RiLockPasswordLine />}
      hasError={passwordHasError || errorPswMsg}
      errorMsg={
        errorPswMsg ? errorPswMsg : "Password should be at least 6 characters"
      }
      inputValidityClass={passwordInputClasses}
    />
  );
};

export default PasswordInput;
