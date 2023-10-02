import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData } from "../helpers/fetch-cart";

const initialState = {
  error: null,
  isLoading: false,
  fulfilledMessage: "",
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsFulfilled(state, action) {
      state.fulfilledMessage = action.payload;
    },
    reset(state) {
      const orders = state.orders;
      return { ...initialState, orders };
    },
    setOrders(state, action) {
      state.orders = [...state.orders, ...action.payload];
    },
    clearOrders() {
      return initialState;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;

// create a thunk function for sending the order
export const sendingCartData =
  (method, orderData, uniqueId) => async (dispatch) => {
    dispatch(orderActions.setIsLoading(true));
    dispatch(orderActions.setError(null));

    try {
      const response = await fetch(
        "https://react-shoes-project-default-rtdb.firebaseio.com/orders.json",
        {
          method: method === "POST" ? "POST" : "GET",
          headers:
            method === "POST" ? { "Content-Type": "application/json" } : {},
          body: method === "POST" ? JSON.stringify(orderData) : null,
        }
      );
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error("Something went wrong!");
      }

      if (method === "POST") {
        // updating cartPending
        await fetchCartData(dispatch, "DELETE");
        localStorage.removeItem("items");
        localStorage.removeItem("totalAmount");
        //
        dispatch(
          orderActions.setOrders([{ ...orderData, orderName: data.name }])
        );
        dispatch(
          orderActions.setIsFulfilled("You sent the order successfully!")
        );
      } else {
        const keyWithUniqueId = Object.keys(data)
          .filter((key) => data[key].uniqueId === uniqueId)
          .map((key) => {
            data[key].orderName = key;
            return data[key];
          });
        dispatch(orderActions.setOrders(keyWithUniqueId));
      }
    } catch (err) {
      dispatch(orderActions.setError(err.message));
    }
    dispatch(orderActions.setIsLoading(false));
    if (method === "POST") {
      setTimeout(() => {
        dispatch(orderActions.reset());
      }, 5000);
    }
  };
