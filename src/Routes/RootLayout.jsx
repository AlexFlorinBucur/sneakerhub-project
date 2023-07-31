import React from "react";
import MainHeader from "../components/Navigation/MainHeader";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
