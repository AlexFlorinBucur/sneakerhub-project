import React from "react";
import classes from "../Sneakers/Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList/SneakerList";
import { useSelector } from "react-redux";
import SneakerHeader from "../../components/Sneaker/SneakerHeader/SneakerHeader";
import { useLocation } from "react-router-dom";
import { HiEmojiHappy, HiFire } from "react-icons/hi";

const Wishlist = () => {
  const { wishlist: wishlistData } = useSelector((state) => state.sneakerData);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <section className={classes["section-products"]}>
      {wishlistData.length !== 0 && (
        <div className={classes["sneakers"]}>
          <SneakerHeader headerName={location.pathname.replace("/", "")} />
          <SneakerList listData={wishlistData} wishlistRoute={true} />
        </div>
      )}
      {isLoggedIn && wishlistData.length === 0 && (
        <div className={classes["wishlist-msg"]}>
          Looks like your wishlist is empty right now. Why not add some items to
          make it more exciting? Explore our collection and find your favorite
          sneakers to add to your wishlist!
        </div>
      )}
      {!isLoggedIn && (
        <div className={classes["wishlist-msg"]}>
          Looks like you need to be logged in to add items to your wishlist.{" "}
          <span>
            <HiEmojiHappy />
          </span>{" "}
          Log in now to start building your personalized sneaker collection or
          view your existing wishlist. Don't miss out on saving your favorites!{" "}
          <span>
            <HiFire />
          </span>
        </div>
      )}
    </section>
  );
};

export default Wishlist;
