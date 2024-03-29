import classes from "./Account.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLogin } from "../../hooks/userActions";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LoginForm from "../../components/Navigation/Login/LoginForm";
import OrderHistory from "../../components/Navigation/Orders/OrderHistory";

const Account = () => {
  const navigate = useNavigate();
  const { orderName } = useParams();

  const { token, isLoggedIn } = useSelector((state) => state.auth);

  const { userAction, switchAction, loadingAction } = useLogin();

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
      <div className={classes["section-title"]}>
        {!orderName ? "Profile" : `Order no. ${orderName}`}
      </div>
      {orderName ? (
        <Outlet />
      ) : (
        <div className={classes["account-actions"]}>
          <div className={classes["edit-info"]}>
            <h3>Edit Information</h3>
            <LoginForm
              userAction={userAction}
              switchAction={switchAction}
              loadingAction={loadingAction}
              token={token}
            />
          </div>
          <div className={classes["account-orders"]}>
            <h1>My orders</h1>
            <OrderHistory />
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
