import classes from "./Cart.module.css";

import { useDispatch, useSelector } from "react-redux";
import CheckoutTop from "../../components/Navigation/Cart/CheckoutTop/CheckoutTop";
import CheckoutSidebar from "../../components/Navigation/Cart/CheckoutSidebar/CheckoutSidebar";
import CheckoutItems from "../../components/Navigation/Cart/CheckoutItems/CheckoutItems";
import { cartActions } from "../../store/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const cartItemRemoveHandler = (id, size, removeItem = false) => {
    dispatch(cartActions.removeItem({ id, size, removeItem }));
  };

  return (
    <div className={`${classes["section-cart"]} ${classes["grid--2-cols"]}`}>
      <CheckoutTop />
      <CheckoutSidebar />
      <div className={classes["checkout-blocks"]}>
        <div className={classes["checkout-header"]}>
          <div className={classes["checkout-header-bg"]}>
            <CheckoutItems
              cartItems={cartItems}
              totalAmount={totalAmount}
              onAdd={cartItemAddHandler}
              onRemove={cartItemRemoveHandler}
            />
          </div>
        </div>
        <div className={classes["checkout-header"]}>
          <div className={classes["checkout-header-bg"]}>
            <span>Login Options</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
