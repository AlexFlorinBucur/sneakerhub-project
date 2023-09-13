import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./LoginForm.module.css";
import { submitHandlerHelper } from "../../../helpers/submit-auth";
import useInput from "../../../hooks/useInput";
import NicknameInput from "./Inputs/NicknameInput";
import EmailInput from "./Inputs/EmailInput";
import PasswordInput from "./Inputs/PasswordInput";
import ConfirmPasswordInput from "./Inputs/ConfirmPasswordInput";
import Spinner from "../../UI/Spinner";

const validateEmail = (email) => {
  const pattern = /^[\w._]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
};

const validatePsw = (value) => {
  return value.trim().length > 5;
};

const validateNickname = (value) => {
  return value.trim().length > 2;
};

const FormContainer = ({ children, submitHandler, isForm }) => {
  return isForm ? (
    <form onSubmit={submitHandler} className={classes["login-form"]}>
      {children}
    </form>
  ) : (
    <div onClick={submitHandler} className={classes["login-form"]}>
      {children}
    </div>
  );
};

const LoginForm = ({
  show,
  userAction,
  switchAction,
  loadingAction,
  token,
  showingOptions,
}) => {
  const dispatch = useDispatch();
  // nickname input
  const {
    value: nicknameValue,
    isValid: nicknameIsValid,
    hasError: nicknameHasError,
    valueChangeHandler: nicknameChangedHandler,
    inputBlurHandler: nicknameBlurHandler,
    reset: resetNicknameInput,
  } = useInput((value) => validateNickname(value));

  //email input
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    errorMessageHandler: errorEmailHandler,
    errorMsg: errorEmailMsg,
  } = useInput((value) => validateEmail(value));

  //psw input
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    errorMessageHandler: errorPswHandler,
    errorMsg: errorPswMsg,
  } = useInput((value) => validatePsw(value));

  //confirm psw input
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => validatePsw(value) && value === passwordValue);

  const resetForm = () => {
    resetNicknameInput();
    resetPasswordInput();
    resetEmailInput();
    resetConfirmPasswordInput();
    errorPswHandler("");
    errorEmailHandler("");
  };

  console.log(userAction);
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const switchUserActionHandler = (type) => {
    switchAction(type);
    resetForm();
  };

  const passwordMatch = confirmPasswordValue === passwordValue;
  let formIsValid = false;

  // if the user want to create an account
  if (
    nicknameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    passwordMatch
  ) {
    formIsValid = true;
  }

  // if the user want to log in
  if (
    userAction.userActionType === "SIGN_IN" &&
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  // if the use want to reset password by email
  if (userAction.userActionType === "FORGOT_PASSWORD" && emailIsValid) {
    formIsValid = true;
  }

  if (
    userAction.userActionType === "RESET_PASSWORD" &&
    nicknameIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    submitHandlerHelper({
      event,
      loadingAction,
      ...(nicknameValue ? { nicknameValue } : {}),
      ...(emailValue ? { emailValue } : {}),
      ...(passwordValue ? { passwordValue } : {}),
      dispatch,
      errorEmailHandler,
      errorPswHandler,
      formIsValid,
      userAction,
      resetForm,
      ...(token ? { token } : {}),
    });
  };

  return (
    <FormContainer submitHandler={submitHandler} isForm={showingOptions}>
      <>
        {(userAction.userActionType === "SIGN_UP" ||
          userAction.userActionType === "SIGN_IN" ||
          userAction.userActionType === "RESET_PASSWORD") &&
          userAction.switchOptions.length !== 2 && (
            <NicknameInput
              nicknameValue={nicknameValue}
              nicknameHasError={nicknameHasError}
              nicknameChangedHandler={nicknameChangedHandler}
              nicknameBlurHandler={nicknameBlurHandler}
            />
          )}
        {userAction.userActionType !== "RESET_PASSWORD" && (
          <EmailInput
            emailValue={emailValue}
            emailHasError={emailHasError}
            emailChangedHandler={emailChangedHandler}
            emailBlurHandler={emailBlurHandler}
            errorEmailMsg={errorEmailMsg}
          />
        )}
        {(userAction.userActionType === "SIGN_UP" ||
          userAction.userActionType === "SIGN_IN" ||
          userAction.userActionType === "RESET_PASSWORD") && (
          <PasswordInput
            passwordValue={passwordValue}
            passwordHasError={passwordHasError}
            passwordChangedHandler={passwordChangedHandler}
            passwordBlurHandler={passwordBlurHandler}
            errorPswMsg={errorPswMsg}
          />
        )}
        {(userAction.userActionType === "SIGN_UP" ||
          userAction.userActionType === "SIGN_IN" ||
          userAction.userActionType === "RESET_PASSWORD") &&
          userAction.switchOptions.length !== 2 && (
            <ConfirmPasswordInput
              confirmPasswordValue={confirmPasswordValue}
              confirmPasswordHasError={confirmPasswordHasError}
              confirmPasswordChangedHandler={confirmPasswordChangedHandler}
              confirmPasswordBlurHandler={confirmPasswordBlurHandler}
              passwordMatch={passwordMatch}
            />
          )}
        {!userAction.isLoading && (
          <div className={classes.actions}>
            <button>{userAction.textBtn}</button>
            {showingOptions &&
              userAction.switchOptions.map((item) => (
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={() => switchUserActionHandler(item.actionType)}
                  key={item.actionType}
                >
                  {item.text}
                </button>
              ))}
          </div>
        )}
        {userAction.isLoading && <Spinner />}
      </>
    </FormContainer>
  );
};

export default LoginForm;
