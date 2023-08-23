import React from "react";
import MainHeader from "../components/Navigation/MainHeader";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/index.js";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </Provider>
  );
};

export default RootLayout;
