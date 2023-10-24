import { useCallback, useMemo, useRef } from "react";
import { useState } from "react";
import classes from "./SneakerFilter.module.css";
import { placeholders } from "../Placeholders";
import { HiSelector } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";
import { generateFilterObject } from "../../../helpers/generate-filter";
import { Fragment } from "react";
import { buildSortUrl } from "../../../helpers/generate-url-sort";
import { useSelector } from "react-redux";

const animationTiming = {
  enter: 400,
  exit: 100,
};

const FilterTransition = ({
  isMobile,
  keyFilter,
  filterName,
  filterObject,
}) => {
  const location = useLocation();
  const nodeRef = useRef(null);

  const filterNavigateHandler = (nameItem) => {
    return `${location.pathname}${
      location.search
        ? `${location.search}&${keyFilter}=${nameItem}`
        : `?${keyFilter}=${nameItem}`
    }`;
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isMobile ? keyFilter === filterName : Boolean(keyFilter)}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: classes.FilterOpen,
        exit: "",
        exitActive: classes.FilterClosed,
      }}
      nodeRef={nodeRef}
    >
      <div className={classes["filter-list"]} ref={nodeRef}>
        <ul>
          {keyFilter &&
            filterObject[keyFilter].map(({ item, count }) => (
              <li key={item}>
                <HiArrowSmRight />
                <Link to={filterNavigateHandler(item)}>
                  {item}
                  <span> ({count})</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </CSSTransition>
  );
};

const SneakerFilter = () => {
  const [keyFilter, setKeyFilter] = useState(false);
  const location = useLocation();
  const { sneakersData, activeFilters } = useSelector(
    (state) => state.sneakerData
  );

  const [dropdownActive, setDropdownActive] = useState(false);

  const filterHandlerName = useCallback((name) => {
    setKeyFilter((prev) => (prev === name ? false : name));
    setDropdownActive(false);
  }, []);

  // works with empty [] too
  const filterObject = useMemo(
    () => generateFilterObject(sneakersData),
    [JSON.stringify(sneakersData)]
  );

  const isMobile = window.innerWidth <= 672;

  return (
    <>
      <div
        className={`${classes["search-filters"]} ${
          classes[
            `grid--${
              placeholders.filters.length -
              Object.keys(activeFilters).length +
              (Object.keys(activeFilters).includes("order") ? 2 : 1)
            }-cols`
          ]
        }`}
      >
        {placeholders.filters
          .filter(
            (filterActive) =>
              !activeFilters.hasOwnProperty(filterActive.filterName)
          )
          .map(({ filterName }) => (
            <Fragment key={filterName}>
              <div
                className={`${classes["filter-cat"]} ${
                  keyFilter === filterName ? classes.active : ""
                }`}
                key={filterName}
                onClick={() => filterHandlerName(filterName)}
              >
                <span>{filterName}</span>
                <HiSelector />
              </div>
              {isMobile && (
                <FilterTransition
                  isMobile={isMobile}
                  keyFilter={keyFilter}
                  filterName={filterName}
                  filterObject={filterObject}
                />
              )}
            </Fragment>
          ))}
        <div
          className={`${classes["filter-cat"]} ${classes["order-items"]} ${
            dropdownActive ? classes["open"] : ""
          }`}
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <div className={classes["select-order"]}>
            <span>Sort by: select</span>
            <HiSelector />
          </div>
          <div className={classes["dropdown-menu"]}>
            {placeholders.sortOptions.map((option) => (
              <Link
                to={buildSortUrl(location, option.sortItem)}
                key={option.sortItem}
              >
                {option.sortTxt}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {!isMobile && (
        <FilterTransition
          isMobile={isMobile}
          keyFilter={keyFilter}
          filterObject={filterObject}
        />
      )}
    </>
  );
};

export default SneakerFilter;
