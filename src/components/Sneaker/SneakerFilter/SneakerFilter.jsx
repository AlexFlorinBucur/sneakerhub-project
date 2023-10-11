import { useRef } from "react";
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

const animationTiming = {
  enter: 400,
  exit: 100,
};

const FilterTransition = ({
  isMobile,
  keyFilter,
  filterName,
  filterObject,
  filterNavigateHandler,
  animationTiming,
  classes,
  nodeRef,
}) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isMobile ? Boolean(keyFilter === filterName) : Boolean(keyFilter)}
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

const SneakerFilter = ({ sneakersData, activeFilters }) => {
  const [keyFilter, setKeyFilter] = useState(false);
  const location = useLocation();

  const [dropdownActive, setDropdownActive] = useState(false);

  const openDropdownFilter = () => {
    setDropdownActive((state) => !state);
  };

  const filterNavigateHandler = (nameItem) => {
    return `${location.pathname}${
      location.search
        ? `${location.search}&${keyFilter}=${nameItem}`
        : `?${keyFilter}=${nameItem}`
    }`;
  };

  const nodeRef = useRef(null);

  const filterHandlerName = (name) => {
    if (keyFilter === name) {
      setKeyFilter(false);
      setDropdownActive(false);
    } else {
      setKeyFilter(name);
      setDropdownActive(false);
    }
  };

  const filterObject = generateFilterObject(sneakersData);

  const isMobile = window.innerWidth <= 672;

  console.log(isMobile);

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
                  filterNavigateHandler={filterNavigateHandler}
                  animationTiming={animationTiming}
                  classes={classes}
                  nodeRef={nodeRef}
                />
              )}
            </Fragment>
          ))}
        <div
          className={`${classes["filter-cat"]} ${classes["order-items"]} ${
            dropdownActive ? classes["open"] : ""
          }`}
          onClick={openDropdownFilter}
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
          filterNavigateHandler={filterNavigateHandler}
          animationTiming={animationTiming}
          classes={classes}
          nodeRef={nodeRef}
        />
      )}
    </>
  );
};

export default SneakerFilter;
