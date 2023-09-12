import { HiOutlineUserCircle } from "react-icons/hi";
import Input from "../../../UI/Input";
import classes from "./RepetitiveInput.module.css";

const EmailInput = ({
  emailValue,
  emailHasError,
  emailChangedHandler,
  emailBlurHandler,
  errorEmailMsg,
}) => {
  const emailInputClasses = emailHasError ? classes.invalid : "";

  return (
    <Input
      input={{
        type: "text",
        id: "email",
        required: "required",
        value: emailValue,
        onChange: emailChangedHandler,
        onBlur: emailBlurHandler,
      }}
      label={{
        htmlFor: "email",
        text: "Email",
      }}
      hasSvg={<HiOutlineUserCircle />}
      hasError={emailHasError || errorEmailMsg}
      errorMsg={
        errorEmailMsg
          ? errorEmailMsg
          : "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@', a part following @, '.' and domain!"
      }
      inputValidityClass={emailInputClasses}
    />
  );
};

export default EmailInput;
