import React, { useRef } from "react";
import classes from "./Menu.module.css";
import { placeholders } from "../Placeholders";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";
import { Link } from "react-router-dom";

const Menu = ({ onCloseModal, show }) => {
  return (
    <>
      <Modal onClose={onCloseModal} show={show}>
        <Drawer
          cssClass={classes.left}
          onCloseModal={onCloseModal}
          show={show}
          animationClassEnter={classes.ModalOpenLeft}
          animationClassExit={classes.ModalClosedLeft}
        >
          <ul className={classes["gender-selector"]}>
            {placeholders.menuLinks.map(({ name, url }) => (
              <li key={name}>
                <Link to={url} onClick={onCloseModal}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </Modal>
    </>
  );
};

export default Menu;
