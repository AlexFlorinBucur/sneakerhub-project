import { toast } from "react-toastify";
import { authActions } from "../store/auth";
import { fetchCartData } from "./fetch-cart";

export const submitHandlerHelper = async ({
  event,
  loadingAction,
  nicknameValue,
  emailValue,
  passwordValue,
  dispatch,
  errorEmailHandler,
  errorPswHandler,
  formIsValid,
  userAction,
  resetForm,
  token,
}) => {
  event.preventDefault();

  if (!formIsValid) {
    return;
  }

  loadingAction(true);
  let url;
  const API_KEY = "AIzaSyDK72VM_xYtP1JEehRksJbZo5VkfGlPFvs";
  if (userAction.userActionType === "SIGN_UP") {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  } else if (userAction.userActionType === "SIGN_IN") {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  } else if (userAction.userActionType === "FORGOT_PASSWORD") {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  } else if (userAction.userActionType === "RESET_PASSWORD") {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        displayName: nicknameValue,
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
        // only for url with FORGOT_PASSWORD
        requestType: "PASSWORD_RESET",
        // for url with RESET_PASSWORD
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    loadingAction(false);

    if (response.ok) {
      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      const userId = data.localId;
      dispatch(
        authActions.login({
          token: data.idToken,
          autoLogoutDate: expirationTime.toISOString(),
          userName: data.displayName,
          userId,
        })
      );
      userAction.userActionType === "RESET_PASSWORD"
        ? toast.success("Your data has been updated.")
        : "";
      resetForm();
    } else {
      const data = await response.json();
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      resetForm();

      throw new Error(errorMessage);
    }

    // updating the cart part
    await fetchCartData(dispatch, "PUT");
  } catch (err) {
    loadingAction(false);
    toast.error(err.message);

    err.message.includes("PASSWORD")
      ? errorPswHandler(err.message)
      : errorEmailHandler(err.message);
  }
};
