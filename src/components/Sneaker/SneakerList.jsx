import React from "react";
import classes from "./SneakerList.module.css";
import { Link } from "react-router-dom";

const SneakerList = ({ sneakersData }) => {
  return (
    <div className={classes["sneaker-products"]}>
      <ul>
        {sneakersData.map(
          ({
            sneakerImage,
            id,
            brandName,
            name,
            sizeRange,
            retailPriceCents,
          }) => (
            <li className={classes["sneaker-item"]} key={id}>
              <Link to={`${id}`}>
                <p className={classes["brand-name"]}>{brandName}</p>
                <img src={sneakerImage} alt={name} />
                <div className={classes["sneaker-name-size"]}>
                  <p>{name}</p>
                  <p>
                    {"Available: "}
                    {sizeRange
                      .sort((a, b) => a - b)
                      .map((size) => {
                        return `${size} `;
                      })}
                  </p>
                </div>
                <p className={classes["sneaker-price"]}>
                  {retailPriceCents / 100} $
                </p>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SneakerList;
