import React, { useRef } from "react";
import classes from "./SneakerDetailsForm.module.css";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { sneakerActions } from "../../../store/sneakers";
import { toast } from "react-toastify";
import { ButtonTypes } from "../../Navigation/Placeholders";
import Button from "../../UI/Button";

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
      toast.success("The wishlist has been updated!");
    } else {
      toast.error("Log in to add products to your favorites.");
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
          {sizeRange.map((el) => (
            <option key={el} value={el} title={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className={classes["product-buttons"]}>
        <Button
          btnText={ButtonTypes.addToCart.text}
          btnType={ButtonTypes.addToCart.type}
          extraClasses={classes["cart-btn"]}
        />
        <Button
          btnText={ButtonTypes.wishlist.text}
          btnType={ButtonTypes.wishlist.type}
          btnIcon={!filtredItems.length ? <HiOutlineHeart /> : <HiHeart />}
          extraClasses={`${classes["cart-btn"]} ${classes["wishlist-btn"]}`}
          onClick={toggleWishList}
        />
      </div>
    </form>
  );
};

export default SneakerDetailsForm;
