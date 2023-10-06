import React from "react";
import classes from "./SneakerLink.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { sneakerActions } from "../../../store/sneakers";

const SneakerLink = ({
  gender,
  id,
  brandName,
  sneakerImage,
  name,
  sizeRange,
  retailPrice,
  wishlistRoute,
}) => {
  const dispatch = useDispatch();

  const onRemoveFromWishlist = (id) => {
    dispatch(sneakerActions.removeItemFromWish(id));
  };

  return (
    <Link to={`/shopping/${gender}/${id}`}>
      <p className={classes["brand-name"]}>{brandName}</p>
      <img
        src={sneakerImage}
        alt={name}
        className={classes["sneaker-img-list"]}
      />
      <div
        className={`${classes["sneaker-name-size"]} ${
          wishlistRoute ? classes["wishlist-rmv"] : ""
        }`}
      >
        <p className={classes["sneaker-product-name"]}>{name}</p>
        {!wishlistRoute ? (
          <p>
            {"Available: "}
            {sizeRange
              .toSorted((a, b) => a - b)
              .map((size) => {
                return `${size} `;
              })}
          </p>
        ) : (
          <HiOutlineTrash
            onClick={(e) => {
              e.preventDefault();
              onRemoveFromWishlist(id);
            }}
          />
        )}
      </div>
      {!wishlistRoute && (
        <p className={classes["sneaker-price"]}>{`${retailPrice.toFixed(
          2
        )} $`}</p>
      )}
    </Link>
  );
};

export default SneakerLink;
