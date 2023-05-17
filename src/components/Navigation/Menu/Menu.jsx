import React from "react";
import { MdClose } from "react-icons/md";
import classes from "./Menu.module.css";
import { placeholders } from "../Placeholders";

const Menu = () => {
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.drawer}>
        <div className={classes["logo-exit"]}>
          <MdClose className={classes["exit-icon"]} />
        </div>
        {/*  */}
        <ul className={classes["gender-selector"]}>
          {placeholders.menuLinks.map(({ name, url }) => (
            <li key={name}>
              <a href={url}>{name}</a>
            </li>
          ))}
          {/* <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Sneakers men</a>
          </li>
          <li>
            <a href="#">Sneakers women</a>
          </li>
          <li>
            <a href="#">Sneakers kids</a>
          </li> */}
        </ul>
        {/*  */}
      </div>
    </>
  );
};

export default Menu;
