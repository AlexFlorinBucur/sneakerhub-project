import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./Sneakers.module.css";
import SneakerList from "../../components/Sneaker/SneakerList";
import SneakerFilter from "../../components/Sneaker/SneakerFilter";
import SneakerGender from "../../components/Sneaker/SneakerGender";
import SimpleLine from "../../components/UI/SimpleLine";
import SneakerFilterActive from "../../components/Sneaker/SneakerFilterActive";
import Spinner from "../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers } from "../../store/cart-actions";
import { cartActions } from "../../store/cart-actions";

const Sneakers = () => {
  const dispatch = useDispatch();
  const { sneakersData, isLoading, error, activeFilters } = useSelector(
    (state) => state.sneakerData
  );

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(fetchSneakers(params, query));
    dispatch(cartActions.resetActiveFilters());
  }, [params, location]);

  const deleteQueryHandler = (key) => {
    const queryValue = query.get(key);

    query.delete(key, queryValue);
    dispatch(cartActions.removeActiveFilter(key));

    if (query.size === 0) {
      navigate(``);
    } else {
      navigate(`?${query}`);
    }
  };

  return (
    <section className={classes["section-products"]}>
      {params.id && <Outlet />}
      {!params.id && isLoading && <Spinner />}
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
