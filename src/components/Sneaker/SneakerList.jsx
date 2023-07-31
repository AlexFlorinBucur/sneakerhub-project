import React from "react";
import classes from "./SneakerList.module.css";
import { useNavigate } from "react-router-dom";

const SneakerList = ({ sneakersData }) => {
  const navigate = useNavigate();

  const sneakerHandler = (id) => {
    navigate(`${id}`);
  };

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
            <li
              className={classes.sneaker}
              onClick={() => sneakerHandler(id)}
              key={id}
            >
              <p className={classes["brand-name"]}>{brandName}</p>
              <img src={sneakerImage} alt={name} />
              <div className={classes["sneaker-name-size"]}>
                <p>{name}</p>
                <p>
                  {`Available: `}
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
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SneakerList;
