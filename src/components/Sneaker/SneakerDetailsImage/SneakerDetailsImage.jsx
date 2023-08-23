import React from "react";
import classes from "./SneakerDetailsImage.module.css";

const SneakerDetailsImage = ({ sneakerImage, name }) => {
  return (
    <div className={classes["product-image"]}>
      <img src={sneakerImage} alt={name} />
    </div>
  );
};

export default SneakerDetailsImage;
