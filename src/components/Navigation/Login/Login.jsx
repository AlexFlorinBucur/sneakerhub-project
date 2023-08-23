import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import Input from "../../UI/Input";
import useInput from "../../../hooks/useInput";

const Login = ({ onCloseModal, show }) => {
  const [isLogin, setIsLogin] = useState(false);

  //email input
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasErorr,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  //psw input
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    isTouched: isTouchedPsw,
  } = useInput((value) => value.trim().length > 5);

  //confirm psw input
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
    isTouched: isTouchedConfirmPsw,
  } = useInput((value) => value.trim() !== "");

  const resetForm = () => {
    resetPasswordInput();
    resetEmailInput();
    resetConfirmPasswordInput();
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const passwordInputClasses = passwordHasError ? classes.invalid : "";
  const emailInputClasses = emailHasErorr ? classes.invalid : "";
  const confirmPasswordInputClasses = confirmPasswordHasError
    ? classes.invalid
    : "";

  let formIsValid = false;

  const passwordMatch = confirmPasswordValue === passwordValue;

  //if the user want to create an account
  if (
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    passwordMatch
  ) {
    formIsValid = true;
  }

  //if the user want to log in
  if (isLogin && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetForm();
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetForm();
  };

  return (
    <Modal onClose={onCloseModal} show={show}>
      <Drawer
        cssClass={classes.right}
        onCloseModal={onCloseModal}
        show={show}
        animationClassEnter={classes.ModalOpenRight}
        animationClassExit={classes.ModalClosedRight}
      >
        <form className={classes["form-control"]} onSubmit={submitHandler}>
          <Input
            input={{
              type: "email",
              placeholder: "Email",
              required: "required",
              value: emailValue,
              onChange: emailChangedHandler,
              onBlur: emailBlurHandler,
            }}
            inputValidityClass={emailInputClasses}
          />
          <Input
            input={{
              type: "password",
              placeholder: "Password",
              required: "required",
              value: passwordValue,
              onChange: passwordChangedHandler,
              onBlur: passwordBlurHandler,
            }}
            hasError={!passwordIsValid && isTouchedPsw}
            errorMsg={"Password requires 6 characters minimum"}
            inputValidityClass={passwordInputClasses}
          />
          {!isLogin && (
            <Input
              input={{
                type: "password",
                placeholder: "Confirm Password",
                required: "required",
                value: confirmPasswordValue,
                onChange: confirmPasswordChangedHandler,
                onBlur: confirmPasswordBlurHandler,
              }}
              hasError={!passwordMatch && isTouchedPsw && isTouchedConfirmPsw}
              errorMsg={"Password don't match!"}
              inputValidityClass={confirmPasswordInputClasses}
            />
          )}
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </Drawer>
    </Modal>
  );
};

export default Login;
