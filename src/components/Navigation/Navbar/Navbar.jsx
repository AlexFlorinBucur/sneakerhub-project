import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import Logo from "../../../assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";

import { placeholders, MODALS } from "../Placeholders";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const managedClick = ({ name, onSearch, onSignUp }) => {
  // destructuring
  const [{ name: search }, { name: signUp }] = placeholders.mainNavLinks;

  switch (name) {
    case search:
      return onSearch;
    case signUp:
      return onSignUp;
    default:
      return;
  }
};

const Navbar = ({ onShowModal, onHideModal }) => {
  const cartItem = useSelector((state) => state.cart.items);

  const [bumpIsActive, setBumpIsActive] = useState(false);

  const cartIconClasses = `${classes["cart-item"]} ${
    bumpIsActive ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartItem.length === 0) {
      return;
    }
    setBumpIsActive(true);

    const timer = setTimeout(() => {
      setBumpIsActive(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItem]);

  return (
    <header className={classes["header-wrapper"]}>
      <div className={classes["header-discount"]}>
        <span>{placeholders.discount}</span>
      </div>
      <div className={classes["header-nav"]}>
        <div
          className={classes.outline}
          onClick={() => onShowModal(MODALS.menu)}
        >
          <HiOutlineBars3 viewBox="3 3 19 19" />
        </div>
        <Link to="/" className={classes.logo}>
          <img src={Logo} alt="Logo for site" />
        </Link>
        <nav className={classes["nav-options"]}>
          <ul className={classes["main-nav-list"]}>
            {placeholders.mainNavLinks.map(({ name, iconSvg, url }) => {
              const Component = (props) =>
                props.to ? <Link {...props} /> : <a {...props} />;
              return (
                <li key={name}>
                  <Component
                    className={classes["main-nav-link"]}
                    // {...(url ? { href: url } : {})}
                    // SET THE URL
                    {...(url ? { to: url } : {})}
                    // SET THE onClick PROPERTY
                    onClick={managedClick({
                      name,
                      onSearch: () => console.log("Ai apasat SEARCH"),
                      onSignUp: () => onShowModal(MODALS.login),
                    })}
                    // SET THE hover PROPERTY FOR CART LINK
                    {...(url && cartItem.length > 0
                      ? {
                          onMouseEnter: () => onShowModal(MODALS.cart),
                          onMouseLeave: () => onHideModal(MODALS.cart),
                        }
                      : {})}
                  >
                    {!url && iconSvg}
                    {url && (
                      <span
                        {...(cartItem.length > 0
                          ? {
                              className: cartIconClasses,
                            }
                          : {})}
                      >
                        {iconSvg}
                      </span>
                    )}
                    <span>{name}</span>
                  </Component>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
