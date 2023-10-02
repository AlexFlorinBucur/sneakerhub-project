import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import classes from "./Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter";
import SneakerHeader from "../../components/Sneaker/SneakerHeader";
import SimpleLine from "../../components/UI/SimpleLine";
import SneakerFilterActive from "../../components/Sneaker/SneakerFilterActive";
import Spinner from "../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers } from "../../store/sneakers";
import { cartActions } from "../../store/sneakers";
import { toast } from "react-toastify";

const Sneakers = () => {
  const dispatch = useDispatch();
  const { sneakersData, isLoading, error, activeFilters } = useSelector(
    (state) => state.sneakerData
  );

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(fetchSneakers(params, query));
    dispatch(cartActions.resetActiveFilters());
  }, [params, location]);

  return (
    <section className={classes["section-products"]}>
      {params.id && <Outlet />}
      {!params.id && isLoading && <Spinner />}
      {/* {!params.id && !isLoading && error && <p>{error}</p>} */}
      {!params.id && !isLoading && sneakersData.length > 0 && (
        <div className={classes.sneakers}>
          <SneakerHeader gender={params.gender} />
          <SneakerFilter
            sneakersData={sneakersData}
            activeFilters={activeFilters}
          />
          <SneakerFilterActive activeFilters={activeFilters} />
          <SimpleLine />
          <SneakerList sneakersData={sneakersData} />
        </div>
      )}
    </section>
  );
};

export default Sneakers;
