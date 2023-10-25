import React, { useEffect } from "react";
import classes from "./CheckoutLogin.module.css";
import LoginForm from "../../Login/LoginForm";
import { useLogin } from "../../../../hooks/userActions";
import { useSelector } from "react-redux";
import UserAuthenticated from "../../Login/AuthenticatedUser";
import CheckoutOption from "./CheckoutOption";

const CheckoutLogin = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { userAction, switchAction, loadingAction } = useLogin();

  useEffect(() => {
    switchAction("SIGN_UP");
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <>
          <h3>Login Options</h3>
          <div className={classes["login-container"]}>
            <CheckoutOption switchAction={switchAction} />
            <div className={classes["checkout-login-inputs"]}>
              <LoginForm
                show={userAction}
                userAction={userAction}
                switchAction={switchAction}
                loadingAction={loadingAction}
                showingOptions={false}
              />
            </div>
          </div>
        </>
      )}
      {isLoggedIn && <UserAuthenticated switchAction={switchAction} />}
    </>
  );
};

export default CheckoutLogin;
