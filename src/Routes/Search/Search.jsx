import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSneakers, cartActions } from "../../store/sneakers";
import classes from "../Sneakers/Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter";
import SneakerFilterActive from "../../components/Sneaker/SneakerFilterActive";
import Spinner from "../../components/UI/Spinner";
import SimpleLine from "../../components/UI/SimpleLine";
import SneakerHeader from "../../components/Sneaker/SneakerHeader";
import SneakerProductsFound from "../../components/Sneaker/SneakerProductsFound";
import { toast } from "react-toastify";

const Search = () => {
  const params = useParams();
  const { query } = params;
  const dispatch = useDispatch();

  const location = useLocation();
  const queryFilterURL = new URLSearchParams(location.search);

  const { sneakersData, isLoading, error, activeFilters } = useSelector(
    (state) => state.sneakerData
  );

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(fetchSneakers(null, queryFilterURL, query, true));
    dispatch(cartActions.resetActiveFilters());
  }, [query, location]);

  return (
    <section className={classes["section-products"]}>
      <SneakerHeader />
      {isLoading && <Spinner />}
      {!isLoading && sneakersData.length !== 0 && (
        <div className={classes["sneakers"]}>
          <SneakerFilter
            sneakersData={sneakersData}
            activeFilters={activeFilters}
          />
          <SneakerFilterActive activeFilters={activeFilters} />
          <SimpleLine />
          <SneakerList sneakersData={sneakersData} />
        </div>
      )}
      {!isLoading && sneakersData.length === 0 && (
        <SneakerProductsFound products={sneakersData} />
      )}
    </section>
  );
};

export default Search;
