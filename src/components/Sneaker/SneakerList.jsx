import classes from "./SneakerList.module.css";
import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Spinner from "../UI/Spinner";

export const SneakerLink = ({
  gender,
  id,
  brandName,
  sneakerImage,
  name,
  sizeRange,
  retailPrice,
  classes,
}) => {
  return (
    <Link to={`/shopping/${gender}/${id}`}>
      <p className={classes["brand-name"]}>{brandName}</p>
      <img src={sneakerImage} alt={name} />
      <div className={classes["sneaker-name-size"]}>
        <p>{name}</p>
        <p>
          {"Available: "}
          {sizeRange
            .toSorted((a, b) => a - b)
            .map((size) => {
              return `${size} `;
            })}
        </p>
      </div>
      <p className={classes["sneaker-price"]}>{retailPrice.toFixed(2)} $</p>
    </Link>
  );
};

const SneakerList = ({ sneakersData }) => {
  const location = useLocation();
  const [newPageLoading, setNewPageLoading] = useState(false);

  const fetchPost = async (page) => {
    return sneakersData.slice((page - 1) * 6, page * 6);
  };

  const { data, fetchNextPage } = useInfiniteQuery(
    ["query", location.search],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [sneakersData.slice(0, 6)],
        pageParams: [1],
      },
    }
  );

  const lastPostRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const fetchNextPageSneakers = async () => {
      if (
        entry?.isIntersecting &&
        data?.pages.flatMap((page) => page).length < sneakersData.length &&
        !newPageLoading
      ) {
        setNewPageLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setNewPageLoading(false);

        return fetchNextPage();
      }
    };

    fetchNextPageSneakers();
  }, [entry, data, sneakersData]);

  // we use flatMap for destructuring
  const _sneakersData = data?.pages.flatMap((page) => page);

  return (
    <div className={classes["sneaker-products"]}>
      <ul>
        {_sneakersData?.map(
          (
            {
              sneakerImage,
              id,
              brandName,
              name,
              sizeRange,
              retailPrice,
              gender,
            },
            i
          ) => {
            if ((i = _sneakersData.length && !newPageLoading))
              return (
                <li className={classes["sneaker-item"]} key={id} ref={ref}>
                  <SneakerLink
                    gender={gender}
                    id={id}
                    brandName={brandName}
                    sneakerImage={sneakerImage}
                    name={name}
                    sizeRange={sizeRange}
                    retailPrice={retailPrice}
                    classes={classes}
                  />
                </li>
              );

            return (
              <li className={classes["sneaker-item"]} key={id}>
                <SneakerLink
                  gender={gender}
                  id={id}
                  brandName={brandName}
                  sneakerImage={sneakerImage}
                  name={name}
                  sizeRange={sizeRange}
                  retailPrice={retailPrice}
                  classes={classes}
                />
              </li>
            );
          }
        )}
      </ul>
      <div className={classes["articles-number"]}>
        {newPageLoading ? (
          <Spinner />
        ) : (
          `There are ${sneakersData.length} articles with the searched filters.`
        )}
      </div>
    </div>
  );
};

export default SneakerList;
