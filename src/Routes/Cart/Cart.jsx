import classes from "./Cart.module.css";

import { useDispatch, useSelector } from "react-redux";
import CheckoutTop from "../../components/Navigation/Cart/CheckoutTop/CheckoutTop";
import CheckoutSidebar from "../../components/Navigation/Cart/CheckoutSidebar/CheckoutSidebar";
import CheckoutItems from "../../components/Navigation/Cart/CheckoutItems/CheckoutItems";
import CheckoutLogin from "../../components/Navigation/Cart/CheckoutLogin/CheckoutLogin";
import Shipping from "../../components/Navigation/Cart/Shipping/Shipping";
import { useState } from "react";
import Spinner from "../../components/UI/Spinner";
import EmptyCart from "../../components/Navigation/Cart/EmptyCart/EmptyCart";
import { toast } from "react-toastify";
import { cartActions } from "../../store/cart";
import { sendingCartData } from "../../store/order";
import { getTimeFromStamp } from "../../helpers/get-time";
import Button from "../../components/UI/Button";
import {
  minPriceShippingFree,
  shippingPrice,
} from "../../components/Navigation/Placeholders";

const Cart = () => {
  const dispatch = useDispatch();

  const {
    items: cartItems,
    totalAmount,
    totalAmountToPay,
    voucher,
  } = useSelector((state) => state.cart);
  const { isLoggedIn, userId } = useSelector((state) => state.auth);
  const {
    isLoading,
    error,
    fulfilledMessage: fulfilledMsg,
  } = useSelector((state) => state.order);

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

  if (fulfilledMsg) {
    toast.success(fulfilledMsg);
  }

  if (error) {
    toast.error(error);
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

    const orderData = {
      deliveryAdress: shippingInfo,
      orderedItems: cartItems,
      uniqueId: userId,
      orderDate: getTimeFromStamp(new Date().getTime() / 1000),
      status: "PROCESSING",
      totalAmount: voucher ? totalAmountToPay : totalAmount,
      voucher: voucher,
      deliveryPrice: totalAmount < minPriceShippingFree ? shippingPrice : 0,
    };

    dispatch(sendingCartData("POST", orderData));
    dispatch(cartActions.clearCart());
  };

  return (
    <>
      {cartItems.length !== 0 ? (
        <div
          className={`${classes["section-cart"]} ${classes["grid--2-cols"]}`}
        >
          <CheckoutTop />
          <CheckoutSidebar />
          <form onSubmit={submitHandler}>
            <fieldset>
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
              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  btnText={"PLACE ORDER"}
                  extraClasses={classes["order-button"]}
                  btnType={
                    Object.entries(inputError).length === 6
                      ? "button"
                      : "submit"
                  }
                  {...(errorMessages.length === 0 &&
                  Object.entries(inputError).length !== 6
                    ? {}
                    : { onClick: submitHandler })}
                />
              )}
            </fieldset>
          </form>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
