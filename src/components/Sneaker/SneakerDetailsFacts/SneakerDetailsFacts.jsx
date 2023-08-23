import React from "react";
import classes from "./SneakerDetailsFacts.module.css";

const SneakerDetailsFacts = ({ name, storyHtml }) => {
  return (
    <div className={classes["product-facts"]}>
      <h2>FACTS</h2>
      <h3>{name}</h3>
      <p>{storyHtml}</p>
    </div>
  );
};

export default SneakerDetailsFacts;
