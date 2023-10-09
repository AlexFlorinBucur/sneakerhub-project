import { useRef } from "react";
import { useState } from "react";
import classes from "./SneakerFilter.module.css";
import { placeholders } from "../Placeholders";
import { HiSelector } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import { Link, useLocation } from "react-router-dom";
import { generateFilterObject } from "../../../helpers/generate-filter";

const animationTiming = {
  enter: 400,
  exit: 100,
};

const buildSortUrl = (location, sortOrder) => {
  const currentSearch = location.search;

  const cleanedSearch = currentSearch.replace(/([&?])order=[^&]+(&|$)/, "$1");

  const separator = cleanedSearch ? "&" : "?";

  const newSearch = `${cleanedSearch}${separator}order=${sortOrder}`;

  const finalSearch = newSearch.replace(/&+/g, "&");

  return finalSearch;
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
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={Boolean(keyFilter)}
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
    </>

    // !!!!!!FOR FUTURE MOBILE
    // <>
    //   <div className={classes["search-filters"]}>
    //     {placeholders.filters
    //       .filter(
    //         (filterActive) =>
    //           !activeFilters.hasOwnProperty(filterActive.filterName)
    //       )
    //       .map(({ filterName }) => (
    //         <>
    //           <div
    //             className={`${classes["filter-cat"]} ${
    //               keyFilter === filterName ? classes.active : ""
    //             }`}
    //             key={filterName}
    //             onClick={() => filterHandlerName(filterName)}
    //           >
    //             <span>{filterName}</span>
    //             <HiSelector />
    //           </div>
    //           <CSSTransition
    //             mountOnEnter
    //             unmountOnExit
    //             in={Boolean(keyFilter === filterName)}
    //             timeout={animationTiming}
    //             classNames={{
    //               enter: "",
    //               enterActive: classes.FilterOpen,
    //               exit: "",
    //               exitActive: classes.FilterClosed,
    //             }}
    //             nodeRef={nodeRef}
    //           >
    //             <div className={classes["filter-list"]} ref={nodeRef}>
    //               <ul>
    //                 {keyFilter &&
    //                   filterObject[keyFilter].map(({ item, count }) => (
    //                     <li key={item}>
    //                       <HiArrowSmRight />
    //                       <a onClick={() => filterNavigateHandler(item)}>
    //                         {item}
    //                         <span> ({count})</span>
    //                       </a>
    //                     </li>
    //                   ))}
    //               </ul>
    //             </div>
    //           </CSSTransition>
    //         </>
    //       ))}
    //   </div>
    // </>
  );
};

export default SneakerFilter;
