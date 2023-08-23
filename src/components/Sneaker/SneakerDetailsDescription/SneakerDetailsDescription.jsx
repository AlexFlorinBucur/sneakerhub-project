import React from "react";
import classes from "./SneakerDetailsDescription.module.css";

const SneakerDetailsDescription = ({ props }) => {
  return (
    <div className={classes["product-description"]}>
      <h2>THE DETAILS</h2>
      {Object.keys(props).map((keyEl) => {
        if (props[keyEl] !== "" && props[keyEl] !== undefined) {
          const formattedKey = keyEl
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          return (
            <p key={keyEl}>
              <strong>{formattedKey}:</strong> {props[keyEl]}
            </p>
          );
        }
      })}
    </div>
  );
};

export default SneakerDetailsDescription;
