import React from "react";
import classes from "./Drawer.module.css";
import { MdClose } from "react-icons/md";

const Drawer = (props) => {
  return (
    <div className={`${classes.drawer} ${props.cssClass}`}>
      <div className={classes["logo-exit"]}>
        <MdClose className={classes["exit-icon"]} />
      </div>
      {props.children}
    </div>
  );
};

export default Drawer;
