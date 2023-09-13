import { useReducer } from "react";

const initialUserActionState = {
  textBtn: "Create Account",
  switchOptions: [
    { text: "Login with existing account", actionType: "SIGN_UP" },
  ],
  userActionType: "SIGN_UP",
  isLoading: false,
};

const userActionReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_ACTION":
      if (action.payload === "SIGN_UP") {
        return {
          ...state,
          textBtn: "Login",
          switchOptions: [
            { text: "Create new account", actionType: "SIGN_IN" },
            { text: "Forgot password?", actionType: "FORGOT_PASSWORD" },
          ],
          userActionType: "SIGN_IN",
        };
      } else if (action.payload === "RESET_PASSWORD") {
        return {
          ...state,
          textBtn: "Update",
          switchAction: [],
          userActionType: "RESET_PASSWORD",
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
          userActionType: "FORGOT_PASSWORD",
        };
      }
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const useLogin = () => {
  const [userAction, dispatchUserAction] = useReducer(
    userActionReducer,
    initialUserActionState
  );

  return {
    switchAction: (type) =>
      dispatchUserAction({ type: "SWITCH_ACTION", payload: type }),
    loadingAction: (booleanValue) =>
      dispatchUserAction({ type: "LOADING", payload: booleanValue }),
    userAction,
  };
};
