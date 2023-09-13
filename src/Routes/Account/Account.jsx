import classes from "./Account.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLogin } from "../../hooks/userActions";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Navigation/Login/LoginForm";

const Account = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const { userAction, switchAction, loadingAction } = useLogin();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // for Protecting Route if the user is not logged in
  useEffect(() => {
    switchAction("RESET_PASSWORD");
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!userIsLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className={classes["section-account"]}>
      <div className={classes["section-title"]}>Profile</div>
      <div className={classes["account-actions"]}>
        <div className={classes["edit-info"]}>
          <div>
            <h3>Edit Information</h3>
            <LoginForm
              userAction={userAction}
              switchAction={switchAction}
              loadingAction={loadingAction}
              token={token}
              showingOptions={false}
            />
          </div>
        </div>
        <div className={classes["account-orders"]}>My orders</div>
      </div>
    </div>
  );
};

export default Account;
