import classes from "./Cart.module.css";

import { useDispatch, useSelector } from "react-redux";
import CheckoutTop from "../../components/Navigation/Cart/CheckoutTop/CheckoutTop";
import CheckoutSidebar from "../../components/Navigation/Cart/CheckoutSidebar/CheckoutSidebar";
import CheckoutItems from "../../components/Navigation/Cart/CheckoutItems/CheckoutItems";
import CheckoutLogin from "../../components/Navigation/Cart/CheckoutLogin/CheckoutLogin";
import Shipping from "../../components/Navigation/Cart/Shipping/Shipping";
import { useState } from "react";
import { sendingCartData } from "../../store/cart-actions";
import Spinner from "../../components/UI/Spinner";
import EmptyCart from "../../components/Navigation/Cart/EmptyCart/EmptyCart";
import { toast } from "react-toastify";
import { cartActions } from "../../store/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isLoading, error } = useSelector((state) => state.sneakerData);

  const [shippingInfo, setShippingInfo] = useState({});
  const [inputError, setInputError] = useState({});

  const errorMessages = Object.keys(inputError)
    .map((key) => {
      if (!inputError[key]) {
        const fieldName = key.replace("NoError", "");
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is not set correctly.`;
      }
      return null;
    })
    .filter((message) => message !== null);


  let formValid = false;

  if (
    Object.values(inputError).every((value) => value === true) &&
    Object.entries(inputError).length === 6 &&
    errorMessages.length === 0
  ) {
    formValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      toast.error("You must log in first!");
      return;
    }

    if (errorMessages.length !== 0) {
      toast.error(`${errorMessages[0]}`);
    }

    if (!formValid) {
      return;
    }

    if (formValid) {
      dispatch(sendingCartData(shippingInfo, cartItems));
      dispatch(cartActions.clearCart());
    }
  };

  return (
    <>
      {cartItems.length === 0 && <EmptyCart />}
      {cartItems.length !== 0 && (
        <div
          className={`${classes["section-cart"]} ${classes["grid--2-cols"]}`}
        >
          <CheckoutTop />
          <CheckoutSidebar />
          <form onSubmit={submitHandler}>
            <fieldset>
              <div className={classes["checkout-blocks"]}>
                <div className={classes["checkout-header"]}>
                  <div className={classes["checkout-header-bg"]}>
                    <CheckoutItems />
                  </div>
                </div>
                <div className={classes["checkout-header"]}>
                  <div className={classes["checkout-header-bg"]}>
                    <CheckoutLogin />
                  </div>
                </div>
                <div className={classes["checkout-header"]}>
                  <div className={classes["checkout-header-bg"]}>
                    <Shipping
                      setShippingInfo={setShippingInfo}
                      setInputError={setInputError}
                    />
                  </div>
                </div>
                <div className={classes["checkout-header"]}>
                  <div className={classes["checkout-header-bg"]}>
                    <CheckoutItems shipping={true} />
                  </div>
                </div>
              </div>
              <div
                className={`${classes["actions"]} ${classes["order-button"]}`}
              >
                {isLoading && <Spinner />}
                {!isLoading && <button>PLACE ORDER</button>}
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};

export default Cart;
