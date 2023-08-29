import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import authReducer from "./auth";
import sneakerDataReducer from "./cart-actions";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    sneakerData: sneakerDataReducer,
  },
});

export default store;
