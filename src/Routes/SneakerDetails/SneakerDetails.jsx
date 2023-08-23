import classes from "./SneakerDetails.module.css";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import SneakerDetailsFacts from "../../components/Sneaker/SneakerDetailsFacts/SneakerDetailsFacts.jsx";
import SneakerTracking from "../../components/Sneaker/SneakerTracking/SneakerTracking.jsx";
import SneakerDetailsImage from "../../components/Sneaker/SneakerDetailsImage/SneakerDetailsImage.jsx";
import SneakerProductData from "../../components/Sneaker/SneakerProductData/SneakerProductData.jsx";
import Spinner from "../../components/UI/Spinner";

const SneakerDetails = () => {
  const params = useParams();
  console.log(params);

  const [sneakersData, setSneakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // async function sneakerFetchHandler() {
  const sneakerFetchHandler = useCallback(async (params) => {
    setIsLoading(true);

    setError(null);

    try {
      const response = await fetch(
        "https://react-shoes-project-default-rtdb.firebaseio.com/sneakers.json"
      );

      const data = await response.json();

      if (!response.ok || data == null) {
        throw new Error("Something went wrong!");
      }

      const transformedData = data
        .map((sneakerData) => {
          return {
            id: sneakerData.id,
            sneakerImage: sneakerData.main_picture_url,
            brandName: sneakerData.brand_name,
            name: sneakerData.name,
            sizeRange: sneakerData.size_range,
            retailPrice: sneakerData.retail_price_cents / 100,
            storyHtml: sneakerData.story_html,
            details: sneakerData.details,
            releaseDateUnix: sneakerData.release_date_unix,
            sku: sneakerData.sku,
            designer: sneakerData.designer,
            nickname: sneakerData.nickname,
            color: sneakerData.color,
            upperMaterial: sneakerData.upper_material,
            category: sneakerData.category,
            gender: sneakerData.gender[0],
          };
        })
        .filter((filtredGender) => {
          return params.id
            ? filtredGender.id === Number(params.id) &&
                filtredGender.gender === params.gender
            : filtredGender.gender === params.gender;
        });

      setSneakersData(transformedData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    sneakerFetchHandler(params);
  }, [sneakerFetchHandler, params]);

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
            brandName,
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
