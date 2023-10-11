import classes from "./SneakerList.module.css";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../UI/Spinner";
import SneakerLink from "../SneakerLink/SneakerLink";
import { useSelector } from "react-redux";

const SneakerList = ({ sneakersData, wishlistRoute = false }) => {
  const location = useLocation();
  const [newPageLoading, setNewPageLoading] = useState(false);
  const { wishlist } = useSelector((state) => state.sneakerData);

  const fetchPost = async (page) => {
    return sneakersData.slice((page - 1) * 6, page * 6);
  };

  const { data, fetchNextPage } = useInfiniteQuery(
    // we add snearksData because when we are in wishlist and we try to remove 1 item, this component need to render again. To do that we need to put sneakersData here(because we modify sneakersData when we remove item)
    ["query", location.search, sneakersData],
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
  }, [entry, data, sneakersData, wishlist]);

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
            if (i === _sneakersData.length - 1 && !newPageLoading)
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
                    wishlistRoute={wishlistRoute}
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
                  wishlistRoute={wishlistRoute}
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