import classes from "./SneakerDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SneakerDetailsFacts from "../../components/Sneaker/SneakerDetailsFacts/SneakerDetailsFacts.jsx";
import SneakerTracking from "../../components/Sneaker/SneakerTracking/SneakerTracking.jsx";
import SneakerDetailsImage from "../../components/Sneaker/SneakerDetailsImage/SneakerDetailsImage.jsx";
import SneakerProductData from "../../components/Sneaker/SneakerProductData/SneakerProductData.jsx";
import Spinner from "../../components/UI/Spinner";

const SneakerDetails = () => {
  const params = useParams();

  const { sneakersData, isLoading, error } = useSelector(
    (state) => state.sneakerData
  );

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
            <div
              className={`${classes["details"]} ${classes["grid--2-cols"]}`}
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
            </div>
          )
        )}
    </>
  );
};

export default SneakerDetails;
