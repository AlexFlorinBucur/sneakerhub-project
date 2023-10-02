import React from "react";
import classes from "./Button.module.css";

const Button = ({ btnText, children, extraClasses, onClick, btnType }) => {
  const btnClasses = extraClasses
    ? `${classes["actions"]} ${extraClasses}`
    : classes["actions"];

  return (
    <div className={btnClasses}>
      <button onClick={onClick} type={btnType}>
        {btnText}
      </button>
      {children}
    </div>
  );
};

export default Button;
