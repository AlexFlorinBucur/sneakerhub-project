import React, { useEffect } from "react";
import classes from "./Login.module.css";
import Modal from "../../UI/Modal";
import Drawer from "../../UI/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { authActions, autoLogout } from "../../../store/auth";
import { useLogin } from "../../../hooks/userActions";
import LoginForm from "./LoginForm";
import UserAuthenticated from "./AuthenticatedUser";
import { cartActions } from "../../../store/cart";
import { sendingCartData } from "../../../store/order";
import { fetchWishlist } from "../../../helpers/fetch-wishlist";
import { sneakerActions } from "../../../store/sneakers";

const Login = ({ onCloseModal, show }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const expirationTime = useSelector((state) => state.auth.expirationTime);
  const userId = useSelector((state) => state.auth.userId);

  const { userAction, switchAction, loadingAction } = useLogin();

  // if the user dont have an account and revisit the page we keep his cart
  useEffect(() => {
    const oldCart = JSON.parse(localStorage.getItem("items"));
    const totalAmount = localStorage.getItem("totalAmount");

    if (oldCart) {
      dispatch(cartActions.updateCart({ items: oldCart, totalAmount }));
    }
  }, []);

  // this is for refresh after login first time
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationDate");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (token) {
      dispatch(
        authActions.login({
          token,
          autoLogoutDate: expirationTime,
          userName,
          userId,
        })
      );
    }
  }, []);

  // this is for setting the orders and wishlist
  useEffect(() => {
    if (userId) {
      dispatch(sendingCartData("GET", null, userId));

      const oldWish = JSON.parse(localStorage.getItem("wishlist"));

      if (!oldWish && oldWish?.length !== 0) {
        dispatch(fetchWishlist());
      } else {
        dispatch(sneakerActions.updateWishData(oldWish));
      }
    }
  }, [Boolean(userId)]);

  useEffect(() => {
    if (isLoggedIn && expirationTime) {
      console.log("expire in", expirationTime, "ms");
      dispatch(autoLogout(expirationTime));
    }
  }, [isLoggedIn, expirationTime]);

  return (
    <Modal onClose={onCloseModal} show={show}>
      <Drawer
        cssClass={classes.right}
        onCloseModal={onCloseModal}
        show={show}
        animationClassEnter={classes.ModalOpenRight}
        animationClassExit={classes.ModalClosedRight}
      >
        {!isLoggedIn && (
          <LoginForm
            show={show}
            userAction={userAction}
            switchAction={switchAction}
            loadingAction={loadingAction}
            showingOptions={true}
          />
        )}
        {isLoggedIn && (
          <UserAuthenticated
            onCloseModal={onCloseModal}
            switchAction={switchAction}
          />
        )}
      </Drawer>
    </Modal>
  );
};

export default Login;
