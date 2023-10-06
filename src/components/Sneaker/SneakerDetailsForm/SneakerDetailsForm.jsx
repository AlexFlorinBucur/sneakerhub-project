import React, { useRef } from "react";
import classes from "./SneakerDetailsForm.module.css";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { sneakerActions } from "../../../store/sneakers";
import { toast } from "react-toastify";

const SneakerDetailsForm = ({ sizeRange, onAddToCart }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { sneakersData: sneakerData, wishlist } = useSelector(
    (state) => state.sneakerData
  );
  const selectedSizeRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredSize = selectedSizeRef.current.value;
    const enteredSizeNumber = +enteredSize;

    onAddToCart(enteredSizeNumber);
  };

  const dispatch = useDispatch();

  const toggleWishList = () => {
    if (isLoggedIn) {
      dispatch(sneakerActions.setWishlist(sneakerData[0]));
      toast.success("Wishlist-ul a fost updatat!");
    } else {
      toast.error("logheaza-te");
    }
  };

  const filtredItems = wishlist.filter((item) => item.id === sneakerData[0].id);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["product-variants"]}>
        <select
          id="select-size"
          name="Size"
          placeholder="Size"
          ref={selectedSizeRef}
          required
        >
          {sizeRange
            .toSorted((a, b) => a - b)
            .map((el) => (
              <option key={el} value={el} title={el}>
                {el}
              </option>
            ))}
        </select>
      </div>
      <div className={classes["product-buttons"]}>
        <button className={classes.btn}>Add to bag</button>
        <button
          type="button"
          className={`${classes.btn} ${classes.wishlist}`}
          onClick={toggleWishList}
        >
          Wishlist {!filtredItems.length ? <HiOutlineHeart /> : <HiHeart />}
        </button>
      </div>
    </form>
  );
};

export default SneakerDetailsForm;
