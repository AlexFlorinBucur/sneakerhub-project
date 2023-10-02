import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Menu from "../Menu/Menu";
import { MODALS } from "../Placeholders";
import CartModal from "../Cart/CartModal/CartModal";
import { useCallback } from "react";
import SearchBar from "../SearchBar/SearchBar";

const MainHeader = () => {
  const [modalIsShown, setModalIsShown] = useState("");

  const showModalHandler = (id) => {
    setModalIsShown(id);
  };

  const hideModalHandler = useCallback(() => {
    setModalIsShown("");
  }, []);

  return (
    <>
      <Navbar onShowModal={showModalHandler} onHideModal={hideModalHandler} />
      {/* SUNT AFISATE DATORITA mountOnEnter din CSSTRANSITION  */}
      <Login
        onCloseModal={hideModalHandler}
        show={modalIsShown === MODALS.login}
      />
      <Menu
        onCloseModal={hideModalHandler}
        show={modalIsShown === MODALS.menu}
      />
      <CartModal
        onShowModal={showModalHandler}
        show={modalIsShown === MODALS.cart}
      />
      <SearchBar
        onCloseModal={hideModalHandler}
        show={modalIsShown === MODALS.search}
      />
    </>
  );
};

export default MainHeader;
