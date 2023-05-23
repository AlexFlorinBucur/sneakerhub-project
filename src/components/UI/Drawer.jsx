import React from "react";
import classes from "./Drawer.module.css";
import { MdClose } from "react-icons/md";

const Drawer = ({ children, cssClass, onCloseModal }) => {
  return (
    <div className={`${classes.drawer} ${cssClass}`}>
      <div className={classes["logo-exit"]} onClick={onCloseModal}>
        <MdClose className={classes["exit-icon"]} />
      </div>
      {children}
    </div>
  );
};

export default Drawer;
