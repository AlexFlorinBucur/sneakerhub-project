import { Link } from "react-router-dom";
import SimpleLine from "../../../UI/SimpleLine";
import classes from "./CheckoutItems.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CheckoutItems = ({ cartItems, totalAmount, onAdd, onRemove }) => {
  return (
    <>
      <tabel>
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
                <div className={classes["modify-qty"]}>
                  <button
                    type="button"
                    className={classes["qty-btn"]}
                    // onClick={onRemove.bind(null, item.id, item.size)}
                    onClick={() => onRemove(item.id, item.size)}
                  >
                    <span className={classes["minus-span"]}>-</span>
                  </button>
                  <span>
                    <input type="text" value={item.amount} />
                  </span>
                  <button
                    type="button"
                    className={classes["qty-btn"]}
                    // onClick={onAdd.bind(null, item)}
                    onClick={() => onAdd(item)}
                  >
                    <span className="plus-span">+</span>
                  </button>
                </div>
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
                  onClick={() => onRemove(item.id, item.size, true)}
                >
                  <AiOutlineCloseCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </tabel>
      <SimpleLine />
      <table className={classes["checkout-total"]}>
        <thead>
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
        </thead>
      </table>
    </>
  );
};

export default CheckoutItems;
