import React from "react";
import classes from "./SneakerDetails.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { SlSocialDropbox } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaMapMarkedAltSolid } from "react-icons/lia";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import SimpleLine from "../../components/UI/SimpleLine";

const getTimeFromStamp = function (timestamp) {
  const day = new Date(timestamp * 1000);
  const newTimestampFormat =
    day.getDate() + "/" + `${day.getMonth() + 1}` + "/" + day.getFullYear();
  return newTimestampFormat;
};

const SneakerDetails = () => {
  const params = useParams();

  const [sneakersData, setSneakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // async function sneakerFetchHandler() {
  const sneakerFetchHandler = useCallback(async (params) => {
    setIsLoading(true);

    setError(null);

    try {
      const response = await fetch(
        "https://react-shoes-project-default-rtdb.firebaseio.com/sneakers.json"
      );

      const data = await response.json();

      if (!response.ok || data == null) {
        throw new Error("Something went wrong!");
      }

      const transformedData = data
        .map((sneakerData) => {
          return {
            id: sneakerData.id,
            sneakerImage: sneakerData.grid_picture_url,
            brandName: sneakerData.brand_name,
            name: sneakerData.name,
            sizeRange: sneakerData.size_range,
            retailPriceCents: sneakerData.retail_price_cents,
            storyHtml: sneakerData.story_html,
            details: sneakerData.details,
            releaseDateUnix: sneakerData.release_date_unix,
            sku: sneakerData.sku,
            designer: sneakerData.designer,
            nickname: sneakerData.nickname,
            color: sneakerData.color,
            upperMaterial: sneakerData.upper_material,
            category: sneakerData.category,
            gender: sneakerData.gender[0],
          };
        })
        .filter((filtredGender) => {
          return params.id
            ? filtredGender.id === Number(params.id) &&
                filtredGender.gender === params.gender
            : filtredGender.gender === params.gender;
        });

      setSneakersData(transformedData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    sneakerFetchHandler(params);
  }, [sneakerFetchHandler, params]);
  return (
    <>
      {isLoading && <p style={{ fontSize: "10rem" }}>LOADING DATA...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading &&
        sneakersData.length > 0 &&
        sneakersData.map(
          ({
            id,
            sneakerImage,
            brandName,
            name,
            sizeRange,
            retailPriceCents,
            storyHtml,
            details,
            releaseDateUnix,
            sku,
            designer,
            nickname,
            color,
            upperMaterial,
            category,
          }) => (
            <div
              className={`${classes["section-details"]} ${classes["grid--2-cols"]}`}
              key={id}
            >
              <div className={classes["product-image"]}>
                <img src={sneakerImage} alt={name} />
              </div>
              <div className={classes["product-data"]}>
                <div className={classes["product-name"]}>
                  <h1>{name.toUpperCase()}</h1>
                  <h3>{details}</h3>
                  <p className={classes["product-price"]}>
                    {retailPriceCents / 100} $
                  </p>
                </div>
                <form>
                  <div className={classes["product-variants"]}>
                    <select
                      id="select-size"
                      name="Size"
                      placeholder="Size"
                      required
                    >
                      {sizeRange
                        .sort((a, b) => a - b)
                        .map((el) => (
                          <option key={el}>{el}</option>
                        ))}
                    </select>
                  </div>
                  <div className={classes["product-buttons"]}>
                    <button className={classes.btn}>Add to bag</button>
                    <div className={`${classes.btn} ${classes.wishlist}`}>
                      Wishlist <AiOutlineHeart />
                    </div>
                  </div>
                </form>
                <SimpleLine />
                <div className={classes["product-description"]}>
                  <h2>THE DETAILS</h2>
                  <p>
                    <strong>Release Date:</strong>{" "}
                    {getTimeFromStamp(releaseDateUnix)}
                  </p>
                  <p>
                    <strong>SKU:</strong> {sku}
                  </p>
                  <p>
                    <strong>Designer:</strong> {designer}
                  </p>
                  <p>
                    <strong>Nickname:</strong> {nickname}
                  </p>
                  <p>
                    <strong>Colorway:</strong> {details}
                  </p>
                  <p>
                    <strong>Main Color:</strong> {color}
                  </p>
                  <p>
                    <strong>Upper Material:</strong> {upperMaterial}
                  </p>
                  <p>
                    <strong>Category:</strong> {category.map((el) => `${el} `)}
                  </p>
                </div>
                <SimpleLine />
              </div>
              <div className={classes["product-facts"]}>
                <h2>FACTS</h2>
                <h3>{name}</h3>
                <p>{storyHtml}</p>
              </div>
              <div className={classes["product-track"]}>
                <div className={classes["product-track-detail"]}>
                  <SlSocialDropbox />
                  <span>Double boxed</span>
                </div>
                <div className={classes["product-track-detail"]}>
                  <LiaShippingFastSolid />
                  <span>24H Shipping</span>
                </div>
                <div className={classes["product-track-detail"]}>
                  <LiaMapMarkedAltSolid />
                  <span>Fully tracked</span>
                </div>
              </div>
            </div>
          )
        )}
    </>
  );
};

export default SneakerDetails;
