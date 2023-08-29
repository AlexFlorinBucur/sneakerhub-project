import classes from "./SneakerDetails.module.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import SneakerDetailsFacts from "../../components/Sneaker/SneakerDetailsFacts/SneakerDetailsFacts.jsx";
import SneakerTracking from "../../components/Sneaker/SneakerTracking/SneakerTracking.jsx";
import SneakerDetailsImage from "../../components/Sneaker/SneakerDetailsImage/SneakerDetailsImage.jsx";
import SneakerProductData from "../../components/Sneaker/SneakerProductData/SneakerProductData.jsx";
import Spinner from "../../components/UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers } from "../../store/cart-actions";

const SneakerDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const { sneakersData, isLoading, error } = useSelector(
    (state) => state.sneakerData
  );

  useEffect(() => {
    dispatch(fetchSneakers(params));
  }, [params]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading &&
        sneakersData.length > 0 &&
        sneakersData.map(
          ({
            id,
            sneakerImage,
            name,
            sizeRange,
            retailPrice,
            storyHtml,
            details,
            releaseDateUnix,
            sku,
            designer,
            nickname,
            color,
            upperMaterial,
            category,
          }) => (
            <section
              className={`${classes["section-details"]} ${classes["grid--2-cols"]}`}
              key={id}
            >
              <SneakerDetailsImage sneakerImage={sneakerImage} name={name} />
              <SneakerProductData
                name={name}
                details={details}
                retailPrice={retailPrice}
                sizeRange={sizeRange}
                id={id}
                sneakerImage={sneakerImage}
                sku={sku}
                designer={designer}
                nickname={nickname}
                color={color}
                upperMaterial={upperMaterial}
                category={category}
                releaseDateUnix={releaseDateUnix}
                gender={params.gender}
              />
              <SneakerDetailsFacts name={name} storyHtml={storyHtml} />
              <SneakerTracking />
            </section>
          )
        )}
    </>
  );
};

export default SneakerDetails;
