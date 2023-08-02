import React from "react";
import classes from "./SneakerFilterActive.module.css";
import { MdFilterListOff, MdOutlineFilterAltOff } from "react-icons/md";
import { Link } from "react-router-dom";

const SneakerFilterActive = ({ activeFilters, onDeleteQuery }) => {
  return (
    <>
      {Object.keys(activeFilters).length > 0 && (
        <div className={classes["active-search-filters"]}>
          <ul>
            {Object.entries(activeFilters).map(([key, value]) => (
              <li>
                <div
                  className={classes["active-filter-list-item"]}
                  onClick={() => onDeleteQuery(key)}
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
