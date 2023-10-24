import React from "react";
import classes from "./SneakerHeader.module.css";
import { useParams } from "react-router-dom";

const SneakerHeader = ({ headerName }) => {
  const params = useParams();
  return (
    <div className={classes["sneaker-gender"]}>
      {params.query
        ? `Search results for " ${params.query} "`
        : `SNEAKER ${headerName.toUpperCase()}`}
    </div>
  );
};

export default SneakerHeader;
