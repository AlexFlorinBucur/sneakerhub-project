import React from "react";
import classes from "./CheckoutOption.module.css";

const CheckoutOption = ({ switchAction }) => {
  return (
    <div className={classes["checkout-option"]}>
      <div className={classes["checkout-wrapper-option"]}>
        <input
          type="radio"
          name="checkout-option"
          id="logged-checkout"
          defaultChecked
          onClick={() => switchAction("SIGN_UP")}
        />
        <label htmlFor="logged-checkout">LOG IN INTO SHOP</label>
      </div>
      <div className={classes["checkout-wrapper-option"]}>
        <input
          type="radio"
          name="checkout-option"
          id="register-checkout"
          onClick={() => switchAction("SIGN_IN")}
        />
        <label htmlFor="register-checkout">CREATE AN ACCOUNT RIGHT NOW</label>
      </div>
    </div>
  );
};

export default CheckoutOption;
