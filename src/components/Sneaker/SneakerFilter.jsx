import React, { useRef } from "react";
import { useState } from "react";
import classes from "./SneakerFilter.module.css";
import { placeholders } from "./Placeholders";
import { BiExpandVertical } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";

const animationTiming = {
  enter: 400,
  exit: 100,
};

const SneakerFilter = ({ sneakersData, activeFilters }) => {
  const [keyFilter, setKeyFilter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.search);
  const query = new URLSearchParams(location.search);

  const filterNavigateHandler = (nameItem) => {
    navigate({
      pathname: `${location.pathname}`,
      search: location.search
        ? `${location.search}&${keyFilter}=${nameItem}`
        : `?${keyFilter}=${nameItem}`,
    });
  };

  const nodeRef = useRef(null);

  const filterHandlerName = (name) => {
    if (keyFilter === name) {
      setKeyFilter(false);
    } else {
      setKeyFilter(name);
    }
  };

  // Inițializăm un obiect gol care va conține numărul de obiecte pentru fiecare brandName
  const brandCounts = {};

  // Inițializăm un array gol care va conține toate valorile "category" din obiectele din "data"
  const allCategories = [];

  // Inițializăm un array gol care va conține toate valorile "size" din obiectele din "data"
  const allSizes = [];

  // Inițializăm un array gol care va conține toate valorile "retailPriceCents" din obiectele din "data"
  const allPrices = [];

  // Iterăm prin fiecare obiect și numărăm câte obiecte avem pentru fiecare brandName și adăugăm valorile "category", "sizeRange" și "retailPriceCents" în allCategories, allSizes și allPrices
  for (const item of sneakersData) {
    const brandName = item.brandName;
    brandCounts[brandName] = (brandCounts[brandName] || 0) + 1;

    allCategories.push(...item.category);
    allSizes.push(item.sizeRange);
    allPrices.push(item.retailPriceCents);
  }

  // Inițializăm un obiect gol care va conține numărul de obiecte pentru fiecare category
  const categoryCounts = {};

  // Iterăm prin valorile din allCategories și numărăm câte apariții are fiecare categorie
  for (const category of allCategories) {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }

  // Inițializăm un obiect gol care va conține numărul de obiecte pentru fiecare size
  const sizeCounts = {};

  // Iterăm prin valorile din allSizes și numărăm câte apariții are fiecare size
  for (const size of allSizes.flat()) {
    sizeCounts[size] = (sizeCounts[size] || 0) + 1;
  }

  // Calculăm cel mai mic și cel mai mare preț
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  // Definim numărul dorit de intervale
  const numberOfIntervals = 12;
  // Aici poți schimba numărul de intervale

  // Calculăm intervalul dintre prețuri
  const priceInterval =
    maxPrice - minPrice ? (maxPrice - minPrice) / numberOfIntervals : minPrice;

  // Inițializăm un obiect gol care va conține numărul de obiecte pentru fiecare interval de prețuri
  const priceCounts = {};

  // Iterăm prin valorile din allPrices și împărțim fiecare preț în intervalul corespunzător
  for (const price of allPrices) {
    const intervalIndex = Math.floor((price - minPrice) / priceInterval);
    const intervalStart = minPrice + intervalIndex * priceInterval;
    const intervalEnd = intervalStart + priceInterval;

    const intervalLabel = `${intervalStart.toFixed(2)} - ${intervalEnd.toFixed(
      2
    )}`;

    priceCounts[intervalLabel] = (priceCounts[intervalLabel] || 0) + 1;
  }

  // Inițializăm două noi array-uri cu obiectele "brandName" și "category" și numărul lor
  const brandArray = Object.entries(brandCounts).map(([brandName, count]) => ({
    item: brandName,
    count: count,
  }));

  const categoryArray = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      item: category,
      count: count,
    })
  );

  // Inițializăm un nou array, array-ul cu dimensiuni (sizeArray) în ordine crescătoare
  const sizeArray = Object.entries(sizeCounts)
    .map(([size, count]) => ({ item: size, count: count }))
    .sort((a, b) => a.item - b.item);

  // Inițializăm un nou array cu obiectele "price" și numărul lor
  const priceArray = Object.entries(priceCounts)
    .map(([interval, count]) => ({
      item: interval,
      count: count,
    }))
    .sort((a, b) => parseFloat(a.item) - parseFloat(b.item));

  // În cadrul "priceArray", deoarece cheia "item" reprezintă un șir de caractere care conține intervale de prețuri, am folosit metoda "parseFloat()" pentru a converti aceste șiruri de caractere în valori numerice (float). Acest lucru este necesar pentru a asigura o sortare corectă a intervalelor de prețuri, deoarece sortarea valorilor numerice se va face în mod corect în ordine crescătoare.

  // De exemplu, dacă avem intervalele "100.00 - 200.00" și "200.00 - 300.00", sortarea directă a șirurilor de caractere ar putea duce la o sortare incorectă (de exemplu, dacă sortarea se face alfabetic, atunci "200.00 - 300.00" va fi înaintea "100.00 - 200.00"). Prin convertirea acestor șiruri de caractere în valori numerice cu "parseFloat()", asigurăm o sortare numerică corectă.

  // În acest context, "parseFloat()" este folosit pentru a converti șirurile de caractere (reprezentând intervale de prețuri) în valori numerice, astfel încât sortarea să fie realizată în mod corect.

  // Construim object-ul final cu cu forma dorită, adăugând cele patru array-uri într-un object nou, numit "filterObject":
  const filterObject = {
    brands: brandArray,
    categories: categoryArray,
    size: sizeArray,
    price: priceArray,
  };

  return (
    <>
      <div className={classes["search-filters"]}>
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
                  <a onClick={() => filterNavigateHandler(item)}>
                    {item}
                    <span> ({count})</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  );
};

export default SneakerFilter;
