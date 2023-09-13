import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const totalAmount =
        +state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      localStorage.setItem("items", JSON.stringify(updatedItems));
      localStorage.setItem("totalAmount", totalAmount);

      return {
        items: updatedItems,
        totalAmount,
      };
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      const existingItem = state.items[existingCartItemIndex];
      let updatedTotalAmount;
      let updatedItems;

      updatedTotalAmount = +state.totalAmount - existingItem.price;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(
          (_, index) => index !== existingCartItemIndex
        );
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      if (action.payload.removeItem === true) {
        updatedItems = state.items.filter(
          (_, index) => index !== existingCartItemIndex
        );
        updatedTotalAmount =
          +state.totalAmount - existingItem.price * existingItem.amount;
      }

      localStorage.setItem("items", JSON.stringify(updatedItems));
      localStorage.setItem("totalAmount", updatedTotalAmount);

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    },
    clearCart() {
      return initialCartState;
    },
    updateCart(state, action) {
      const items = action.payload.items;
      const totalAmount = +action.payload.totalAmount;
      return { items, totalAmount };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
