import React, { useState } from "react";
import Navbar from "./Navigation/Navbar/Navbar";
import Slider from "./Navigation/Slider/Slider";
import Login from "./Navigation/Login/Login";
import Menu from "./Navigation/Menu/Menu";
import Sneakers from "../pages/Sneakers";
import { MODALS } from "./Navigation/Placeholders";

const Home = () => {
  const [modalIsShown, setModalIsShown] = useState("");

  const showModalHandler = (id) => {
    setModalIsShown(id);
  };

  const hideModalHandler = () => {
    setModalIsShown("");
  };

  return (
    <>
      <Navbar onShowModal={showModalHandler} />
      {/* <Slider /> */}
      {modalIsShown === MODALS.login && (
        <Login onCloseModal={hideModalHandler} />
      )}
      {modalIsShown === MODALS.menu && <Menu onCloseModal={hideModalHandler} />}
      <Sneakers />
    </>
  );
};

export default Home;
