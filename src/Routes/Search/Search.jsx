import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSneakers, sneakerActions } from "../../store/sneakers";
import classes from "../Sneakers/Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter/SneakerFilter";
import SneakerFilterActive from "../../components/Sneaker/SneakerFilterActive/SneakerFilterActive";
import Spinner from "../../components/UI/Spinner";
import SimpleLine from "../../components/UI/SimpleLine";
import SneakerHeader from "../../components/Sneaker/SneakerHeader/SneakerHeader";
import SneakerProductsFound from "../../components/Sneaker/SneakerProductsFound/SneakerProductsFound";
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
    dispatch(sneakerActions.resetActiveFilters());
  }, [query, location]);

  const searchedQueryHasData = sneakersData.length !== 0;

  return (
    <section className={classes["section-products"]}>
      <SneakerHeader />
      {isLoading && <Spinner />}
      {!isLoading && searchedQueryHasData && (
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
      {!isLoading && !searchedQueryHasData && (
        <SneakerProductsFound products={sneakersData} />
      )}
    </section>
  );
};

export default Search;
