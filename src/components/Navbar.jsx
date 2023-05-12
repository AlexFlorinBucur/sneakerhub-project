import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  HiOutlineSearch,
  HiShoppingCart,
  HiOutlineUserCircle,
} from "react-icons/hi";

const Navbar = () => {
  return (
    <>
      <header className={classes["header-wrapper"]}>
        <div className={classes["header-discount"]}>
          <span>25% OFF @ CHECKOUT</span>
        </div>
        <div className={classes["header-nav"]}>
          <div className={classes.outline}>
            <HiOutlineBars3 viewBox="3 3 19 19" />
          </div>
          <a href="#home" className={classes.logo}>
            <img src={Logo} alt="Logo for site" className={classes.logo} />
          </a>
          <nav className={classes["nav-options"]}>
            <ul className={classes["main-nav-list"]}>
              <li>
                <a className={classes["main-nav-link"]} href="#">
                  <HiOutlineSearch />
                  <span>Search</span>
                </a>
              </li>
              <li>
                <a className={classes["main-nav-link"]} href="#">
                  <HiOutlineUserCircle />
                  <span>SIGN UP</span>
                </a>
              </li>
              <li>
                <a className={classes["main-nav-link"]} href="#">
                  <HiShoppingCart />
                  <span>CART</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
