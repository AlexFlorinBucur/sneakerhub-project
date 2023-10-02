import { useRef } from "react";
import { useState } from "react";
import classes from "./SneakerFilter.module.css";
import { placeholders } from "./Placeholders";
import { BiExpandVertical } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateFilterObject } from "../../helpers/generate-filter";

const animationTiming = {
  enter: 400,
  exit: 100,
};

const buildSortUrl = (location, sortOrder) => {
  const currentSearch = location.search;

  // Eliminare alti parametri "order"
  const cleanedSearch = currentSearch.replace(/([&?])order=[^&]+(&|$)/, "$1");

  // Adăugare simbol "&" doar dacă query string nu este gol
  const separator = cleanedSearch ? "&" : "?";

  // Construirea noului URL
  const newSearch = `${cleanedSearch}${separator}order=${sortOrder}`;

  // Înlocuirea caracterele duplicate de tipul "&&&&" cu un singur "&"
  const finalSearch = newSearch.replace(/&+/g, "&");

  return finalSearch;
};

const SneakerFilter = ({ sneakersData, activeFilters }) => {
  const [keyFilter, setKeyFilter] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  const [orderActive, setOrderActive] = useState(false);

  const openDropdownOrder = () => {
    setOrderActive((state) => !state);
  };

  // const filterNavigateHandler = (nameItem) => {
  //   navigate({
  //     pathname: `${location.pathname}`,
  //     search: location.search
  //       ? `${location.search}&${keyFilter}=${nameItem}`
  //       : `?${keyFilter}=${nameItem}`,
  //   });
  // };

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
      setOrderActive(false);
    } else {
      setKeyFilter(name);
      setOrderActive(false);
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
              <BiExpandVertical />
            </div>
          ))}
        <div
          className={`${classes["filter-cat"]} ${classes["order-items"]} ${
            orderActive ? classes["open"] : ""
          }`}
          onClick={() => openDropdownOrder()}
        >
          <div className={classes["select-order"]}>
            <span>Sort by: select</span>
            <BiExpandVertical />
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
                  <AiOutlineArrowRight />
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
    //             <BiExpandVertical />
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
    //                       <AiOutlineArrowRight />
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
