import React from "react";
import classes from "./SneakerTracking.module.css";
import { SlSocialDropbox } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaMapMarkedAltSolid } from "react-icons/lia";

const SneakerTracking = () => {
  return (
    <div className={classes["product-track"]}>
      <div className={classes["product-track-detail"]}>
        <SlSocialDropbox />
        <span>Double boxed</span>
      </div>
      <div className={classes["product-track-detail"]}>
        <LiaShippingFastSolid />
        <span>24H Shipping</span>
      </div>
      <div className={classes["product-track-detail"]}>
        <LiaMapMarkedAltSolid />
        <span>Fully tracked</span>
      </div>
    </div>
  );
};

export default SneakerTracking;
