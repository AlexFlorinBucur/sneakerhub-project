import React from "react";
import classes from "./SneakerDetailsName.module.css";

const SneakerDetailsName = ({ name, details, retailPrice }) => {
  return (
    <div className={classes["product-name"]}>
      <h1>{name.toUpperCase()}</h1>
      <h3>{details}</h3>
      <p className={classes["product-price"]}>{retailPrice.toFixed(2)} $</p>
    </div>
  );
};

export default SneakerDetailsName;
