import React from "react";
import classes from "./AuthenticatedUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth";
import { cartActions } from "../../../store/cart";
import { fetchCartData } from "../../../helpers/fetch-cart";
import { orderActions } from "../../../store/order";
import Button from "../../UI/Button";
import { fetchWishlist } from "../../../helpers/fetch-wishlist";
import { ButtonTypes } from "../Placeholders";
import { toast } from "react-toastify";

const UserAuthenticated = ({ onCloseModal, switchAction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    fetchCartData(dispatch, cartItems?.length === 0 ? "DELETE" : "PUT", true);
    dispatch(fetchWishlist(true));
    dispatch(authActions.logout());
    toast.success("You have successfully logged out!");
    dispatch(cartActions.clearCart());
    dispatch(orderActions.clearOrders());
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
      <h3
        className={classes["welcome-user"]}
      >{`Welcome to SNKR, ${userName}!`}</h3>
      <div className={classes["authenticated"]}>
        <Button
          btnText={ButtonTypes.account.text}
          onClick={navigateToAccount}
          btnType={ButtonTypes.account.type}
        />
        <Button
          btnText={ButtonTypes.logout.text}
          onClick={logoutHandler}
          extraClasses={classes["btn-margin"]}
          btnType={ButtonTypes.logout.type}
        />
      </div>
    </>
  );
};

export default UserAuthenticated;
