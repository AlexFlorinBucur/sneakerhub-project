import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../../../assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";

import { placeholders } from "../Placeholders";

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

const Navbar = () => {
  return (
    <>
      <header className={classes["header-wrapper"]}>
        <div className={classes["header-discount"]}>
          <span>{placeholders.discount}</span>
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
              {placeholders.mainNavLinks.map(({ name, iconSvg, url }) => (
                <li key={name}>
                  <a
                    className={classes["main-nav-link"]}
                    {...(url ? { href: url } : {})}
                    // manage clicked for links
                    onClick={managedClick({
                      name,
                      onSearch: () => console.log("Ai apasat SEARCH"),
                      onSignUp: () => console.log("Ai apasat SIGNUP"),
                    })}
                  >
                    {iconSvg}
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;