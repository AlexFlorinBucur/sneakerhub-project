import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import { authActions, autoLogout } from "../store/auth";
import { sneakerActions } from "../store/sneakers";
import { sendingCartData } from "../store/order";
import { fetchWishlist } from "../helpers/fetch-wishlist";

const useDataInitialization = (userId, isLoggedIn, expirationTime) => {
  const dispatch = useDispatch();

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

  // disconnect the user after expirationTime expire
  useEffect(() => {
    if (isLoggedIn && expirationTime) {
      dispatch(autoLogout(expirationTime));
    }
  }, [isLoggedIn, expirationTime]);
};

export default useDataInitialization;
