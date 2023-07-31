import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import { MODALS } from "./Placeholders";

const MainHeader = () => {
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
      {/* SUNT AFISATE DATORITA mountOnEnter din CSSTRANSITION  */}
      <Login
        onCloseModal={hideModalHandler}
        show={modalIsShown === MODALS.login}
      />
      <Menu
        onCloseModal={hideModalHandler}
        show={modalIsShown === MODALS.menu}
      />
    </>
  );
};

export default MainHeader;
