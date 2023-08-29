import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { token: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      const isLoggedIn = !!token;
      return {
        token: token,
        isLoggedIn: isLoggedIn,
      };
    },
    logout() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
