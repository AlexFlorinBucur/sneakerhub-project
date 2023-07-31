import React from "react";
import classes from "./Input.module.css";

const Input = ({ label, input }) => {
  return (
    <div className={classes.input}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input {...input}></input>
    </div>
  );
};

export default Input;
