import React from "react";
import classes from "./Input.module.css";

const Input = ({ label, input, inputValidityClass, hasError, errorMsg }) => {
  return (
    <div className={`${classes.input} ${inputValidityClass}`}>
      {hasError && <p>{errorMsg}</p>}
      {label && <label htmlFor={input.id}>{label}</label>}
      <input {...input}></input>
    </div>
  );
};

export default Input;
