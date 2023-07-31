import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import classes from "./Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter";
import SneakerGender from "../../components/Sneaker/SneakerGender";
import SimpleLine from "../../components/UI/SimpleLine";

const Sneakers = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  for (const key of query.keys()) {
    console.log(key);
    let values = query.get(key);
    console.log(values);
  }

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
            brandName: sneakerData.brand_name,
            name: sneakerData.name,
            sizeRange: sneakerData.size_range,
            retailPriceCents: sneakerData.retail_price_cents,
            sneakerImage: sneakerData.grid_picture_url,
            category: sneakerData.category,
            gender: sneakerData.gender[0],
          };
        })
        // .filter((filtredGender) => {filtredGender.gender === params.gender);
        .filter((filtredGender) => {
          return params.id
            ? filtredGender.id === Number(params.id) &&
                filtredGender.gender === params.gender
            : filtredGender.gender === params.gender;
        });

      // console.log(transformedData);
      setSneakersData(transformedData);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);
  // console.log(sneakersData);

  useEffect(() => {
    sneakerFetchHandler(params);
  }, [sneakerFetchHandler, params]);

  return (
    <section className={classes["section-products"]}>
      {params.id && <Outlet />}
      {!params.id && isLoading && (
        <p style={{ fontSize: "10rem" }}>LOADING DATA...</p>
      )}
      {!params.id && !isLoading && error && <p>{error}</p>}
      {!params.id && !isLoading && sneakersData.length > 0 && (
        <div className={classes.sneakers}>
          <SneakerGender gender={params.gender} />
          <SneakerFilter sneakersData={sneakersData} />
          <SimpleLine />
          <SneakerList sneakersData={sneakersData} />
        </div>
      )}
    </section>
  );
};

export default Sneakers;
