import React from "react";
import classes from "./SneakerFilterActive.module.css";
import { HiOutlineFilter } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sneakerActions } from "../../../store/sneakers";
import { useDispatch, useSelector } from "react-redux";

const SneakerFilterActive = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const { activeFilters } = useSelector((state) => state.sneakerData);

  const deleteQueryHandler = (key) => {
    const queryValue = query.get(key);

    query.delete(key, queryValue);
    dispatch(sneakerActions.removeActiveFilter(key));

    if (query.size === 0) {
      navigate(``);
    } else {
      navigate(`?${query}`);
    }
  };

  return (
    <>
      {Object.keys(activeFilters).length > 0 && (
        <div className={classes["active-search-filters"]}>
          <ul>
            {Object.entries(activeFilters).map(([key, value]) => (
              <li key={key}>
                <div
                  className={classes["active-filter-list-item"]}
                  onClick={() => deleteQueryHandler(key)}
                >
                  <div>
                    <span className={classes["active-filter-name"]}>
                      {key.toUpperCase()}: {value}
                    </span>
                    <HiOutlineFilter />
                  </div>
                </div>
              </li>
            ))}
            {Object.keys(activeFilters).length > 1 && (
              <li>
                <Link to={""} className={classes["active-filter-list-item"]}>
                  <div>
                    <span className={classes["active-filter-name"]}>
                      Reset all filters!
                    </span>
                    <HiOutlineFilter />
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SneakerFilterActive;
