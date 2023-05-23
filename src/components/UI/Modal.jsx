import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = ({ onCloseModal }) => {
  return <div className={classes.backdrop} onClick={onCloseModal}></div>;
};

const ModalOverlay = ({ children }) => {
  return <div>{children}</div>;
};

const portalElement = document.getElementById("overlay");

const Modal = ({ children, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop onCloseModal={onClose} />
          <ModalOverlay>{children}</ModalOverlay>
        </>,
        portalElement
      )}
    </>
  );
};

export default Modal;
