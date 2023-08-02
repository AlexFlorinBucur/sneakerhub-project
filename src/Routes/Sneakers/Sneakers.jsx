import React, { useEffect, useState, useCallback, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter";
import SneakerGender from "../../components/Sneaker/SneakerGender";
import SimpleLine from "../../components/UI/SimpleLine";
import SneakerFilterActive from "../../components/Sneaker/SneakerFilterActive";

const Sneakers = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  console.log(activeFilters);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  // async function sneakerFetchHandler() {
  const sneakerFetchHandler = useCallback(async (params, query) => {
    setIsLoading(true);
    setError(null);
    setActiveFilters({});

    try {
      const response = await fetch(
        "https://react-shoes-project-default-rtdb.firebaseio.com/sneakers.json"
      );

      const data = await response.json();

      if (!response.ok || data == null) {
        throw new Error("Something went wrong!");
      }

      const valueObj = {};
      for (const key of query.keys()) {
        valueObj[key] = query.get(key);

        setActiveFilters(valueObj);
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
        .filter((sneaker) => {
          if (sneaker.gender !== params.gender) {
            return false;
          }

          // Verificam daca obiectul valueObj contine cheia "brands" si daca brandul corespunde
          if ("brands" in valueObj && sneaker.brandName !== valueObj.brands) {
            return false;
          }

          // Verificam daca obiectul valueObj contine cheia "categories" si daca categoria corespunde
          if (
            "categories" in valueObj &&
            !sneaker.category.includes(valueObj.categories)
          ) {
            return false;
          }

          // Verificam daca obiectul valueObj contine cheia "price" si daca pretul se incadreaza in intervalul specificat
          if ("price" in valueObj) {
            const priceRange = valueObj.price.split("-").map(Number);
            const minPrice = priceRange[0];
            const maxPrice = priceRange[1];
            const sneakerPrice = sneaker.retailPriceCents;

            if (sneakerPrice < minPrice || sneakerPrice > maxPrice) {
              return false;
            }
          }

          // Verificăm dacă obiectul valueObj conține cheia "size" și dacă mărimea este specificată în array-ul size_range al sneaker-ului
          if (
            "size" in valueObj &&
            !sneaker.sizeRange.includes(Number(valueObj.size))
          ) {
            return false;
          }

          // Returnam true daca obiectul trece toate verificarile, ceea ce inseamna ca indeplineste conditiile din valueObj
          return true;
        });

      setSneakersData(transformedData);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);
  // console.log(sneakersData);

  useEffect(() => {
    sneakerFetchHandler(params, query);
  }, [sneakerFetchHandler, params, location]);

  const deleteQueryHandler = (key) => {
    const queryValue = query.get(key);

    query.delete(key, queryValue);

    if (query.size === 0) {
      setActiveFilters({});
      navigate(``);
    } else {
      navigate(`?${query}`);
    }
  };

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
          <SneakerFilter
            sneakersData={sneakersData}
            activeFilters={activeFilters}
          />
          <SneakerFilterActive
            activeFilters={activeFilters}
            onDeleteQuery={deleteQueryHandler}
          />
          <SimpleLine />
          <SneakerList sneakersData={sneakersData} />
        </div>
      )}
    </section>
  );
};

export default Sneakers;
