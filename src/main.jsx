import React from "react";
import "./index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Account,
  Cart,
  OrderDetails,
  RootLayout,
  Search,
  Slider,
  SneakerDetails,
  Sneakers,
  Wishlist,
} from "./Routes/asyncComponents";
// import Wishlist from "./Routes/Wishlist/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Slider /> },
      {
        path: "/shopping/:gender/*",
        element: <Sneakers />,
        children: [{ path: ":id", element: <SneakerDetails /> }],
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/account/*",
        element: <Account />,
        children: [
          {
            path: "order/:orderName",
            element: <OrderDetails />,
          },
        ],
      },
      { path: "/search/:query", element: <Search /> },
      { path: "/wishlist", element: <Wishlist /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
