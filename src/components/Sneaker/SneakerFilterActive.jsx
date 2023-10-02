import React from "react";
import classes from "./SneakerFilterActive.module.css";
import { MdFilterListOff, MdOutlineFilterAltOff } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/sneakers";
import { useDispatch } from "react-redux";

const SneakerFilterActive = ({ activeFilters }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

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
                    <MdFilterListOff />
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
                    <MdOutlineFilterAltOff />
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
