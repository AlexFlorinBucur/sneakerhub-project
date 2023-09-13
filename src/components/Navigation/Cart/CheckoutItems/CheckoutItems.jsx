import { Link } from "react-router-dom";
import SimpleLine from "../../../UI/SimpleLine";
import classes from "./CheckoutItems.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cartActions } from "../../../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutItems = ({ shipping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = +useSelector((state) => state.cart.totalAmount);

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
    toast.success("The quantity has been updated!");
  };

  const cartItemRemoveHandler = (id, size, removeItem = false) => {
    dispatch(cartActions.removeItem({ id, size, removeItem }));
    removeItem
      ? toast.success("Item removed successfully from cart!")
      : toast.success("The quantity has been updated!");
  };

  const shippingPrice = 5;
  const minPriceShippingFree = 300;

  const shippingStatus = [
    { name: "subtotal", total: totalAmount },

    {
      name: "shipping",
      total: totalAmount > minPriceShippingFree ? "FREE" : shippingPrice,
    },
    {
      name: "total",
      total:
        totalAmount < minPriceShippingFree
          ? totalAmount + shippingPrice
          : totalAmount,
    },
  ];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className={classes["checkout-name"]}>Your Products</th>
            <th className={classes["checkout-qty"]}>Quantity</th>
            <th className={classes["checkout-price"]}>Price</th>
            <th className={classes["checkout-total-price"]}>Total</th>
            <th className={classes["checkout-qty"]}></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={`${item.id} ${item.size}`}>
              <td>
                <div className={classes["product-name"]}>
                  <div className={classes["product-image"]}>
                    <Link to={`/shopping/${item.gender}/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className={classes["product-details"]}>
                    <Link to={`/shopping/${item.gender}/${item.id}`}>
                      {item.name}
                    </Link>
                    <span>Size: {item.size}</span>
                  </div>
                </div>
              </td>
              <td>
                {!shipping && (
                  <div className={classes["modify-qty"]}>
                    <button
                      type="button"
                      className={classes["qty-btn"]}
                      // onClick={cartItemRemoveHandler.bind(null, item.id, item.size)}
                      onClick={() => cartItemRemoveHandler(item.id, item.size)}
                    >
                      <span className={classes["minus-span"]}>-</span>
                    </button>
                    <span>
                      <input
                        type="text"
                        value={item.amount}
                        onChange={() => null}
                      />
                    </span>
                    <button
                      type="button"
                      className={classes["qty-btn"]}
                      // onClick={cartItemAddHandler.bind(null, item)}
                      onClick={() => cartItemAddHandler(item)}
                    >
                      <span className="plus-span">+</span>
                    </button>
                  </div>
                )}
                {shipping && (
                  <div className={classes["final-qty"]}>{item.amount}</div>
                )}
              </td>
              <td>
                <span className={classes["product-price"]}>
                  {item.price.toFixed(2)} $
                </span>
              </td>
              <td>
                <span className={classes["product-price"]}>
                  {(item.price * item.amount).toFixed(2)} $
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className={classes["qty-btn"]}
                  onClick={() =>
                    cartItemRemoveHandler(item.id, item.size, true)
                  }
                >
                  <AiOutlineCloseCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SimpleLine />
      <table className={classes["checkout-total"]}>
        <thead>
          {!shipping && (
            <tr className={classes["checkout-voucher"]}>
              <th className={classes["voucher-form"]}>
                <input
                  name="discount_name"
                  type="text"
                  className={classes["voucher-text"]}
                  placeholder="Voucher"
                />
                <input
                  type="button"
                  className={classes["button-coupon"]}
                  value="Apply"
                />
              </th>
              <th className={classes["cart-total"]}>
                <span className={classes["cart-label"]}>Total:</span>
              </th>
              <th className={classes["cart-total"]}>
                <span className={classes["cart-total-final"]}>
                  {totalAmount.toFixed(2)}&nbsp;$
                </span>
              </th>
            </tr>
          )}
          {shipping &&
            shippingStatus.map(({ name, total }) => (
              <tr className={classes["checkout-voucher"]} key={name}>
                <th className={classes["cart-total"]}>
                  <span className={classes["cart-label"]}>{name}</span>
                </th>
                <th className={classes["cart-total"]}>
                  <span className={classes["cart-total-final"]}>
                    {typeof total == "number"
                      ? `${total.toFixed(2)}`
                      : `${total}`}
                    &nbsp;$
                  </span>
                </th>
              </tr>
            ))}
          {shipping && totalAmount < minPriceShippingFree && (
            <tr>
              <th className={classes["cart-order-free"]}>
                Please order ${(minPriceShippingFree - totalAmount).toFixed(2)}{" "}
                more for free shipping.
              </th>
            </tr>
          )}
        </thead>
      </table>
    </>
  );
};

export default CheckoutItems;
