import { HiOutlineLockClosed } from "react-icons/hi";

import Input from "../../../UI/Input";
import classes from "./RepetitiveInput.module.css";

const PasswordInput = ({
  passwordValue,
  passwordHasError,
  passwordChangedHandler,
  passwordBlurHandler,
  errorPswMsg,
}) => {
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
      hasSvg={<HiOutlineLockClosed />}
      hasError={passwordHasError || errorPswMsg}
      errorMsg={
        errorPswMsg ? errorPswMsg : "Password should be at least 6 characters"
      }
      inputValidityClass={classes.invalid}
    />
  );
};

export default PasswordInput;
