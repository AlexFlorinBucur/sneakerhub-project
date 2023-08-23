import React from "react";
import classes from "./CheckoutTop.module.css";
import SneakerTracking from "../../../Sneaker/SneakerTracking/SneakerTracking";

const CheckoutTop = () => {
  return (
    <div className={classes["checkout-top"]}>
      <h1>FINISH ORDER</h1>
      <SneakerTracking />
    </div>
  );
};

export default CheckoutTop;
