import React from "react";
import classes from "./Menu.module.css";
import { placeholders } from "../Placeholders";
import Drawer from "../../UI/Drawer";
import Modal from "../../UI/Modal";

const Menu = () => {
  return (
    <>
      <Modal>
        <Drawer cssClass={classes.left}>
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
