import React from "react";
import "./index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sneakers from "./Routes/SneakersGender/Sneakers.jsx";
import RootLayout from "./Routes/RootLayout.jsx";
import Slider from "./Routes/Slider/Slider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Slider /> },
      { path: "/shopping/men", element: <Sneakers /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
