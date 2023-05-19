import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return <div>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <Backdrop />
          <ModalOverlay>{props.children}</ModalOverlay>
        </>,
        portalElement
      )}
    </>
  );
};

export default Modal;
