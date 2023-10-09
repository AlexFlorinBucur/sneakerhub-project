import React from "react";
import classes from "./SneakerTracking.module.css";
import { SlSocialDropbox } from "react-icons/sl";
// import { LiaShippingFastSolid, LiaMapMarkedAltSolid } from "react-icons/lia";
import { HiOutlineMap, HiOutlineTruck } from "react-icons/hi";

const SneakerTracking = () => {
  return (
    <div className={classes["product-track"]}>
      <div className={classes["product-track-detail"]}>
        <SlSocialDropbox />
        <span>Double boxed</span>
      </div>
      <div className={classes["product-track-detail"]}>
        <HiOutlineTruck />
        <span>24H Shipping</span>
      </div>
      <div className={classes["product-track-detail"]}>
        <HiOutlineMap />
        <span>Fully tracked</span>
      </div>
    </div>
  );
};

export default SneakerTracking;
