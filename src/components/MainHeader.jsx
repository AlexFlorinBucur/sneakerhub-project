import React, { useState } from "react";
import Navbar from "./Navigation/Navbar/Navbar";
import Login from "./Navigation/Login/Login";
import Menu from "./Navigation/Menu/Menu";
import { MODALS } from "./Navigation/Placeholders";

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
      {modalIsShown === MODALS.login && (
        <Login onCloseModal={hideModalHandler} />
      )}
      {modalIsShown === MODALS.menu && <Menu onCloseModal={hideModalHandler} />}
    </>
  );
};

export default MainHeader;
