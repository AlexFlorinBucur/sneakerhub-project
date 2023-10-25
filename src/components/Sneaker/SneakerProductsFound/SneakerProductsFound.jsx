import React from "react";
import classes from "./SneakerProductsFound.module.css";
import { useSelector } from "react-redux";

const SneakerProductsFound = () => {
  const { sneakersData } = useSelector((state) => state.sneakerData);

  return (
    <div className={classes["products-length"]}>
      <h2>{`${sneakersData.length} products found. There are currently no products for your search.`}</h2>
    </div>
  );
};

export default SneakerProductsFound;
