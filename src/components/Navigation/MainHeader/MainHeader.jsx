import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Menu from "../Menu/Menu";
import { MODALS } from "../Placeholders";
import CartModal from "../Cart/CartModal/CartModal";
import { useCallback } from "react";
import SearchBar from "../SearchBar/SearchBar";
import useDataInitialization from "../../../hooks/useDataInitialization";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const [modalIsShown, setModalIsShown] = useState("");

  const userId = useSelector((state) => state.auth.userId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const expirationTime = useSelector((state) => state.auth.expirationTime);

  const showModalHandler = useCallback((id) => {
    setModalIsShown(id);
  }, []);

  const hideModalHandler = useCallback(() => {
    setModalIsShown("");
  }, []);

  // INITIALIZE THE DATA
  useDataInitialization(userId, isLoggedIn, expirationTime);

  return (
    <>
      <Navbar onShowModal={showModalHandler} onHideModal={hideModalHandler} />
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
