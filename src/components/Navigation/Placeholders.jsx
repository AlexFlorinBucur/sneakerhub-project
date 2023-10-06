import {
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiShoppingCart,
} from "react-icons/hi";

export const placeholders = {
  discount: "25% OFF @ CHECKOUT",
  mainNavLinks: [
    { name: "Search", iconSvg: <HiOutlineSearch /> },
    { name: "SIGN UP", iconSvg: <HiOutlineUserCircle /> },
    { name: "WISHLIST", url: "/wishlist", iconSvg: <HiOutlineHeart /> },
    { name: "CART", url: "/cart", iconSvg: <HiShoppingCart /> },
  ],
  menuLinks: [
    { name: "home", url: "/" },
    { name: "sneakers men", url: "shopping/men" },
    { name: "sneakers women", url: "shopping/women" },
    { name: "sneakers kids", url: "shopping/kids" },
  ],
};

export const MODALS = {
  login: "LOGIN",
  menu: "MENU",
  cart: "CART",
  search: "SEARCH",
};

export const slideImages = [
  {
    imageMin: "/src/assets/image-carousel-1-min.jpg",
    imageWebp: "/src/assets/image-carousel-1.webp",
    header: "Nike Air Jordan",
    information: "Fresh Jordans",
    link: "/search/air jordan",
    linkText: "shop now",
  },
  {
    imageMin: "/src/assets/image-carousel-2-min.jpg",
    imageWebp: "/src/assets/image-carousel-2.webp",
    header: "Extra25",
    information: "EXTRA 25 DISCOUNT @CHECKOUT",
    link: "/shopping/men",
    linkText: "shop now",
  },
  {
    imageMin: "/src/assets/image-carousel-3-min.jpg",
    imageWebp: "/src/assets/image-carousel-3.webp",
    header: "Best SB",
    information: "CHECK OUT OUR NEW PRODUCTS",
    link: "/search/SB",
    linkText: "shop now",
  },
];

export const voucherCoupon = {
  voucherCode: "snkr25",
  voucherValue: 25,
};

export const shippingPrice = 5;

export const minPriceShippingFree = 300;
