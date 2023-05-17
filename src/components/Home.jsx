import React from "react";
import Navbar from "./Navigation/Navbar/Navbar";
import Slider from "./Navigation/Slider/Slider";
import Login from "./Navigation/Login/Login";
import Menu from "./Navigation/Menu/Menu";
import Sneakers from "../pages/Sneakers";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <Slider /> */}
      {/* <Login /> */}
      {/* <Menu /> */}
      <Sneakers />
    </>
  );
};

export default Home;
