import React from "react";
import classes from "./SneakerGender.module.css";

const SneakerGender = ({ gender }) => {
  return (
    <div className={classes["sneaker-gender"]}>
      SNEAKER {gender.toUpperCase()}
    </div>
  );
};

export default SneakerGender;
