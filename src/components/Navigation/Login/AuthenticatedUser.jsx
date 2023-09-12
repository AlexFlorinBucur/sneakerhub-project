import React from "react";
import classes from "./AuthenticatedUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";
import { cartActions } from "../../../store/cart";
import { fetchCartData } from "../../../helpers/fetch-cart";

const UserAuthenticated = ({ onCloseModal, switchAction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userName);
  const cartItems = useSelector((state) => state.cart.items);

  const logoutHandler = () => {
    fetchCartData(dispatch, cartItems?.length === 0 ? "DELETE" : "PUT", true);
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
    switchAction("SIGN_UP");
    navigate("/");
    onCloseModal();
  };

  const navigateToAccount = () => {
    navigate("/account");
    onCloseModal();
  };

  return (
    <>
      <h3>Welcome to SNKR, {userName}!</h3>
      <div className={classes.authenticated}>
        <div className={classes.actions}>
          <button onClick={navigateToAccount}>My account</button>
          <button onClick={logoutHandler}>Log out</button>
        </div>
      </div>
    </>
  );
};

export default UserAuthenticated;
