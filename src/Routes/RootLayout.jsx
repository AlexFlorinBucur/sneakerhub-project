import React from "react";
import MainHeader from "../components/Navigation/MainHeader";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        style={{ zIndex: 100000, fontSize: "1.6rem" }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        bodyClassName="toastBody"
        pauseOnHover
      />
      <MainHeader />

      <main>
        <Outlet />
      </main>
    </Provider>
  );
};

export default RootLayout;
