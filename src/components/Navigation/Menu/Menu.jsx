import React from "react";
import classes from "./Menu.module.css";
import { placeholders } from "../Placeholders";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";
import { Link } from "react-router-dom";

const Menu = ({ onCloseModal }) => {
  return (
    <>
      <Modal onClose={onCloseModal}>
        <Drawer cssClass={classes.left} onCloseModal={onCloseModal}>
          <ul className={classes["gender-selector"]}>
            {placeholders.menuLinks.map(({ name, url }) => (
              <li key={name}>
                <Link to={url}>{name}</Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </Modal>
    </>
  );
};

export default Menu;
