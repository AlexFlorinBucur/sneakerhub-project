import React from "react";
import classes from "../../../../Routes/Cart/Cart.module.css";
import { HiShoppingCart } from "react-icons/hi";

const EmptyCart = () => {
  return (
    <div className={classes["section-cart"]}>
      <div className={classes["cart-empty-wrapper"]}>
        <HiShoppingCart />
        <h2>Shopping cart</h2>
        <div className={classes["info-header"]}>
          Your cart is empty. Check our recommandations or search the site for
          more products
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
