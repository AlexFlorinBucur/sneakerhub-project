import classes from "./SneakerList.module.css";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../UI/Spinner";
import SneakerLink from "../SneakerLink/SneakerLink";
import { useSelector } from "react-redux";

const SneakerList = ({ listData, wishlistRoute = false }) => {
  const location = useLocation();
  const [newPageLoading, setNewPageLoading] = useState(false);
  const { sneakersData, wishlist } = useSelector((state) => state.sneakerData);

  const queryClient = useQueryClient();

  const fetchPost = async (page) => {
    return listData.slice((page - 1) * 6, page * 6);
  };

  const queryKey = ["query", location.key, listData];

  const { data, fetchNextPage, isSuccess } = useInfiniteQuery(
    // we add listData because when we are in wishlist and we try to remove 1 item, this component need to render again. To do that we need to put listData here(because we modify listData when we remove item)
    queryKey,
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [listData.slice(0, 6)],
        pageParams: [1],
      },
      staleTime: Infinity,
    }
  );

  const lastPostRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const clickedElement = () => {
    queryClient.setQueryData(queryKey, (data) => {
      return {
        ...data,
        scrollToLastHeight: window.scrollY,
      };
    });
  };

  useEffect(() => {
    const scrollToLastHeight =
      queryClient.getQueryData(queryKey)?.scrollToLastHeight;

    if (scrollToLastHeight) {
      window.scrollTo(0, scrollToLastHeight);
    }
  }, [isSuccess]);

  useEffect(() => {
    const fetchNextPageSneakers = async () => {
      if (
        entry?.isIntersecting &&
        data?.pages.flatMap((page) => page).length < listData.length &&
        !newPageLoading
      ) {
        setNewPageLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setNewPageLoading(false);

        return fetchNextPage();
      }
    };

    fetchNextPageSneakers();
  }, [entry, data, listData, wishlist]);

  const _listData = data?.pages.flatMap((page) => page);

  return (
    <div className={classes["sneaker-products"]}>
      <ul>
        {_listData?.map(
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
            const lastItemInRedux =
              id === sneakersData[sneakersData.length - 1].id;
            if (
              i === _listData.length - 1 &&
              !newPageLoading &&
              !lastItemInRedux
            )
              return (
                <li
                  className={classes["sneaker-item"]}
                  key={id}
                  ref={ref}
                  onClick={clickedElement}
                >
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
              <li
                className={classes["sneaker-item"]}
                key={id}
                onClick={() => clickedElement()}
              >
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
          `There are ${listData.length} articles with the searched filters.`
        )}
      </div>
    </div>
  );
};

export default SneakerList;
