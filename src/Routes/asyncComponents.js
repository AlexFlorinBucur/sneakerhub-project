import loadable from "@loadable/component";

export const Sneakers = loadable(() => {
  return import("./Sneakers/Sneakers.jsx");
});

export const RootLayout = loadable(() => {
  return import("./RootLayout.jsx");
});

export const Slider = loadable(() => {
  return import("./Slider/Slider.jsx");
});

export const SneakerDetails = loadable(() => {
  return import("./SneakerDetails/SneakerDetails.jsx");
});

export const Cart = loadable(() => {
  return import("./Cart/Cart.jsx");
});

export const Account = loadable(() => {
  return import("./Account/Account.jsx");
});

export const OrderDetails = loadable(() => {
  return import("./OrderDetails/OrderDetails.jsx");
});

export const Search = loadable(() => {
  return import("./Search/Search.jsx");
});

export const Wishlist = loadable(() => {
  return import("./Wishlist/Wishlist.jsx");
});
