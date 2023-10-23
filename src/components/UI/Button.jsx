import React from "react";
import classes from "./Button.module.css";

const Button = ({
  btnText,
  children,
  extraClasses,
  onClick,
  btnType,
  btnIcon,
}) => {
  const btnClasses = extraClasses
    ? `${classes["actions"]} ${extraClasses}`
    : classes["actions"];

  return (
    <div className={btnClasses}>
      <button onClick={onClick} type={btnType}>
        {btnText} {btnIcon}
      </button>
      {children}
    </div>
  );
};

export default Button;
