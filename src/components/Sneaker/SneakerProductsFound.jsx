import React from "react";
import classes from "./SneakerProductsFound.module.css";

const SneakerProductsFound = ({ products }) => {
  return (
    <div className={classes["products-length"]}>
      <h2>{`${products.length} products found`}</h2>
    </div>
  );
};

export default SneakerProductsFound;
