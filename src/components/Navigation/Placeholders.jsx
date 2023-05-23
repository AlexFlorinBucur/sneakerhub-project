import {
  HiOutlineSearch,
  HiShoppingCart,
  HiOutlineUserCircle,
} from "react-icons/hi";

export const placeholders = {
  discount: "25% OFF @ CHECKOUT",
  mainNavLinks: [
    { name: "Search", iconSvg: <HiOutlineSearch /> },
    { name: "SIGN UP", iconSvg: <HiOutlineUserCircle /> },
    { name: "CART", url: "/cart", iconSvg: <HiShoppingCart /> },
  ],
  menuLinks: [
    { name: "home", url: "/" },
    { name: "sneakers men", url: "/men" },
    { name: "sneakers women", url: "women" },
    { name: "sneakers kids", url: "kids" },
  ],
};

export const MODALS = {
  login: "LOGIN",
  menu: "MENU",
};
