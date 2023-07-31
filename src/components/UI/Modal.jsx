import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = ({ onCloseModal }) => {
  return <div className={classes.backdrop} onClick={onCloseModal}></div>;
};

const ModalOverlay = ({ children }) => {
  return <>{children}</>;
};

const portalElement = document.getElementById("overlay");

const Modal = ({ children, onClose, show }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          {show && <Backdrop onCloseModal={onClose} />}
          <ModalOverlay>{children}</ModalOverlay>
        </>,
        portalElement
      )}
    </>
  );
};

export default Modal;
