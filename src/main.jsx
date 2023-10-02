import React from "react";
import "./index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sneakers from "./Routes/Sneakers/Sneakers.jsx";
import RootLayout from "./Routes/RootLayout.jsx";
import Slider from "./Routes/Slider/Slider.jsx";
import SneakerDetails from "./Routes/SneakerDetails/SneakerDetails";
import Cart from "./Routes/Cart/Cart";
import Account from "./Routes/Account/Account";
import OrderDetails from "./Routes/OrderDetails/OrderDetails";
import Search from "./Routes/Search/Search";

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
        children: [{ path: "order/:orderName", element: <OrderDetails /> }],
      },
      { path: "/search/:query", element: <Search /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
