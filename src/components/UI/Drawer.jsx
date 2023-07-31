import React from "react";
import classes from "./Drawer.module.css";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const animationTiming = {
  enter: 400,
  exit: 400,
};

const Drawer = ({
  children,
  cssClass,
  onCloseModal,
  show,
  animationClassEnter,
  animationClassExit,
}) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: animationClassEnter,
        exit: "",
        exitActive: animationClassExit,
      }}
      nodeRef={nodeRef}
    >
      <div className={`${classes.drawer} ${cssClass} `} ref={nodeRef}>
        <div className={classes["logo-exit"]} onClick={onCloseModal}>
          <MdClose className={classes["exit-icon"]} />
        </div>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Drawer;
