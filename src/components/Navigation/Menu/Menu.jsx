import React from "react";
import classes from "./Menu.module.css";
import { placeholders } from "../Placeholders";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";

const Menu = ({ onCloseModal }) => {
  return (
    <>
      <Modal onClose={onCloseModal}>
        <Drawer cssClass={classes.left} onCloseModal={onCloseModal}>
          <ul className={classes["gender-selector"]}>
            {placeholders.menuLinks.map(({ name, url }) => (
              <li key={name}>
                <a href={url}>{name}</a>
              </li>
            ))}
          </ul>
        </Drawer>
      </Modal>
    </>
  );
};

export default Menu;
