import React, { useEffect, useReducer, useState } from "react";
import classes from "./Login.module.css";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import Input from "../../UI/Input";
import useInput from "../../../hooks/useInput";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Spinner from "../../UI/Spinner";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";

const validateEmail = (email) => {
  const pattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
  return pattern.test(email);
};

const validatePsw = (value) => {
  return value.trim().length > 5;
};

const initialUserActionState = {
  textBtn: "Create Account",
  switchOptions: [
    { text: "Login with existing account", actionType: "SIGN_UP" },
  ],
  userActionType: "SIGN_UP",
  isLoading: false,
};

const userActionReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "SWITCH_ACTION":
      if (action.payload === "SIGN_UP") {
        return {
          ...state,
          textBtn: "Login",
          switchOptions: [
            { text: "Create new account", actionType: "SIGN_IN" },
            { text: "Forgot password?", actionType: "RESET_PASSWORD" },
          ],
          userActionType: "SIGN_IN",
        };
      } else if (action.payload === "SIGN_IN") {
        return initialUserActionState;
      } else {
        return {
          ...state,
          textBtn: "Send Reset Link",
          switchOptions: [
            { text: "Login with existing account", actionType: "SIGN_UP" },
          ],
          userActionType: "RESET_PASSWORD",
        };
      }
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const Login = ({ onCloseModal, show }) => {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.cart.token);

  //email input
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasErorr,
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
    resetPasswordInput();
    resetEmailInput();
    resetConfirmPasswordInput();
    errorPswHandler("");
    errorEmailHandler("");
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  // user action with useReducer
  const [userAction, dispatchUserAction] = useReducer(
    userActionReducer,
    initialUserActionState
  );
  const switchUserActionHandler = (type) => {
    dispatchUserAction({ type: "SWITCH_ACTION", payload: type });
    resetForm();
  };

  const passwordMatch = confirmPasswordValue === passwordValue;
  let formIsValid = false;

  // if the user want to create an account
  if (
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

  // if the use want to reset password
  if (userAction.userActionType === "RESET_PASSWORD" && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatchUserAction({ type: "LOADING", payload: true });

    let url;
    const API_KEY = "AIzaSyDK72VM_xYtP1JEehRksJbZo5VkfGlPFvs";
    if (userAction.userActionType === "SIGN_UP") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    } else if (userAction.userActionType === "SIGN_IN") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true,
          // only for url with reset_password
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatchUserAction({ type: "LOADING", payload: false });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.idToken);
        dispatch(authActions.login(data.idToken));
        resetForm();
      } else {
        const data = await response.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
          console.log(data.error);
        }
        resetForm();
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err.message);
      err.message.includes("PASSWORD")
        ? errorPswHandler(err.message)
        : errorEmailHandler(err.message);
    }
  };

  const passwordInputClasses = passwordHasError ? classes.invalid : "";
  const emailInputClasses = emailHasErorr ? classes.invalid : "";
  const confirmPasswordInputClasses = confirmPasswordHasError
    ? classes.invalid
    : "";

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
            hasError={emailHasErorr || errorEmailMsg}
            errorMsg={
              errorEmailMsg
                ? errorEmailMsg
                : "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@', a part following @, '.' and domain!"
            }
            inputValidityClass={emailInputClasses}
          />
          {(userAction.userActionType === "SIGN_UP" ||
            userAction.userActionType === "SIGN_IN") && (
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
                errorPswMsg
                  ? errorPswMsg
                  : "Password should be at least 6 characters"
              }
              inputValidityClass={passwordInputClasses}
            />
          )}
          {(userAction.userActionType === "SIGN_UP" ||
            userAction.userActionType === "SIGN_IN") &&
            userAction.switchOptions.length !== 2 && (
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
            )}
          {!userAction.isLoading && (
            <div className={classes.actions}>
              <button>{userAction.textBtn}</button>
              {userAction.switchOptions.map((item) => (
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
        </form>
      </Drawer>
    </Modal>
  );
};

export default Login;
