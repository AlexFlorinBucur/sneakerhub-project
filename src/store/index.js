import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";
import authReducer from "./auth";
import sneakerDataReducer from "./sneakers";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    sneakerData: sneakerDataReducer,
    order: orderReducer,
  },
});

export default store;
