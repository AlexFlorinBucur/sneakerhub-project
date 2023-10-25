import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData } from "../helpers/fetch-cart";
import { orderActions } from "./order";
import { fetchWishlist } from "../helpers/fetch-wishlist";

const initialAuthState = {
  token: "",
  isLoggedIn: false,
  expirationTime: null,
  userName: "",
  userId: "",
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

let timeoutRef;

const logoutTimeout = (remainingTime, dispatch) =>
  setTimeout(() => {
    // update the cart before autologout
    const cartItems = JSON.parse(localStorage.getItem("items"));
    fetchCartData(dispatch, cartItems?.length === 0 ? "DELETE" : "PUT", true);

    // clear orders from redux before autologout
    dispatch(orderActions.clearOrders());

    // update wishlist before auto-logout
    dispatch(fetchWishlist(true));

    // do autologout
    dispatch(authActions.logout());
  }, remainingTime);

// thunk function because setTimeout is async
export const autoLogout = (expirationTime) => (dispatch) => {
  timeoutRef = logoutTimeout(expirationTime, dispatch);
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userName");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("items");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("wishlist");

      clearTimeout(timeoutRef);

      return initialAuthState;
    },
    login(state, action) {
      const token = action.payload.token;
      const isLoggedIn = !!token;
      const remainingTime = calculateRemainingTime(
        action.payload.autoLogoutDate
      );
      const userName = action.payload.userName;
      const userId = action.payload.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", isLoggedIn);
      localStorage.setItem(
        "expirationDate",
        new Date(action.payload.autoLogoutDate)
      );
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);

      return {
        token,
        isLoggedIn,
        expirationTime: remainingTime,
        userName,
        userId,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
