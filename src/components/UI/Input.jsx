import React from "react";
import classes from "./Input.module.css";

const Input = ({
  label,
  input,
  inputValidityClass,
  hasError,
  errorMsg,
  hasSvg,
}) => {
  return (
    <>
      <div className={classes["error-msg"]}>
        {hasError && <p>{errorMsg}</p>}
      </div>
      <div className={classes["input-group"]}>
        <input
          {...input}
          className={`${hasError ? inputValidityClass : ""}`}
        ></input>
        {hasSvg && <div className={classes["input-icon"]}>{hasSvg}</div>}
        {label && (
          <label {...label} className={classes["label-input"]}>
            {label.text}
          </label>
        )}
      </div>
    </>
  );
};

export default Input;
