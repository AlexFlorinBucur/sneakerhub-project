import React, { useRef } from "react";
import classes from "./SneakerDetailsForm.module.css";
import { AiOutlineHeart } from "react-icons/ai";

const SneakerDetailsForm = ({ sizeRange, onAddToCart }) => {
  const selectedSizeRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredSize = selectedSizeRef.current.value;
    const enteredSizeNumber = +enteredSize;

    onAddToCart(enteredSizeNumber);
  };

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
        <button className={classes.btn}>Add to bag </button>
        <div className={`${classes.btn} ${classes.wishlist}`}>
          Wishlist <AiOutlineHeart />
        </div>
      </div>
    </form>
  );
};

export default SneakerDetailsForm;
