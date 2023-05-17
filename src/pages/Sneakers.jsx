import React from "react";
import classes from "./Sneakers.module.css";
import { BiExpandVertical } from "react-icons/bi";

const Sneakers = () => {
  return (
    <section style={{ padding: "3rem", backgroundColor: "#fafafa" }}>
      <div className={classes["sneaker-gender"]}>SNEAKERS MEN</div>
      <div className={classes["search-filters"]}>
        <div className={`${classes["filter-cat"]} ${classes.active}`}>
          <span>Categories</span>
          <BiExpandVertical />
        </div>
        <div className={classes["filter-cat"]}>
          <span>Brands</span>
          <BiExpandVertical />
        </div>
        <div className={classes["filter-cat"]}>
          <span>Price</span>
          <BiExpandVertical />
        </div>
        <div className={classes["filter-cat"]}>
          <span>Size</span>
          <BiExpandVertical />
        </div>
        <div className={classes["filter-cat"]}>
          <span>Sort by:select</span>
          <BiExpandVertical />
        </div>
      </div>
      <ul>
        <li className={classes.sneaker}>
          <p>Air jordan</p>
          <p>Air Jordan 1 Retro High OG 'Shadow' 2018</p>
          <img src="https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png" />
        </li>
        <li className={classes.sneaker}>
          <p>Air jordan</p>
          <p>Air Jordan 1 Retro High OG 'Shadow' 2018</p>
          <img src="https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png" />
        </li>
      </ul>
    </section>
  );
};

export default Sneakers;
