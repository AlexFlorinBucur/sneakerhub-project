import React, { useRef } from "react";
import Modal from "../../../UI/Modal";
import classes from "./CartModal.module.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MODALS } from "../../Placeholders";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cartActions } from "../../../../store/cart";
import { toast } from "react-toastify";

const animationTiming = {
  enter: 300,
  exit: 300,
};

const CartModal = ({ show, onShowModal }) => {
  const nodeRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = +useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const cartItemRemoveHandler = (id, size, removeItem = false) => {
    dispatch(cartActions.removeItem({ id, size, removeItem }));
    toast.success("Item removed successfully from cart!");
  };

  return (
    <Modal>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: classes.HoverCart,
          exit: "",
          exitActive: classes.UnhoverCart,
        }}
        nodeRef={nodeRef}
      >
        <div
          className={classes["cart-active"]}
          onMouseEnter={() => onShowModal(MODALS.cart)}
          onMouseLeave={() => onShowModal("")}
          ref={nodeRef}
        >
          <ul className={classes["cart-products"]}>
            {cartItems.map((item) => (
              <li
                className={classes["cart-item"]}
                key={`${item.id} ${item.size}`}
              >
                <div className={classes["cart-item-image"]}>
                  <Link to={`/shopping/${item.gender}/${item.id}`}>
                    <img src={item.image} />
                  </Link>
                </div>
                <div className={classes["cart-item-details"]}>
                  <span>{item.name}</span>
                  <span>Size: {item.size}</span>
                  <span>{item.price.toFixed(2)}&nbsp;$</span>
                </div>
                <button
                  type="button"
                  className={classes["minicart-button"]}
                  onClick={() =>
                    cartItemRemoveHandler(item.id, item.size, true)
                  }
                >
                  <AiOutlineCloseCircle />
                </button>
              </li>
            ))}
          </ul>
          <div className={classes["minicart-footer"]}>
            <Link to={"/cart"} className={classes["minicart-button"]}>
              Proceed to checkout
            </Link>
            <div className={classes["cart-total"]}>
              <span>Total:&nbsp;{totalAmount.toFixed(2)}&nbsp;$</span>
            </div>
          </div>
        </div>
      </CSSTransition>
    </Modal>
  );
};

export default CartModal;
