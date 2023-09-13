import classes from "./SneakerProductData.module.css";
import SneakerDetailsName from "../SneakerDetailsName/SneakerDetailsName";
import SneakerDetailsForm from "../SneakerDetailsForm/SneakerDetailsForm";
import SimpleLine from "../../UI/SimpleLine";
import SneakerDetailsDescription from "../SneakerDetailsDescription/SneakerDetailsDescription";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import { toast } from "react-toastify";

const getTimeFromStamp = function (timestamp) {
  // return an empty string if there is no release_date_unix
  if (!timestamp) {
    return "";
  }

  const day = new Date(timestamp * 1000);
  const newTimestampFormat =
    day.getDate() + "/" + `${day.getMonth() + 1}` + "/" + day.getFullYear();
  return newTimestampFormat;
};

const SneakerProductData = ({
  name,
  details,
  retailPrice,
  sizeRange,
  id,
  sneakerImage,
  sku,
  designer,
  nickname,
  color,
  upperMaterial,
  category,
  releaseDateUnix,
  gender,
}) => {
  const dispatch = useDispatch();

  const addToCartHandler = (size) => {
    dispatch(
      cartActions.addItem({
        id: id,
        name: name,
        amount: 1,
        size: size,
        price: retailPrice,
        image: sneakerImage,
        gender: gender,
      })
    );
    toast.success("Product successfully added!");
  };

  return (
    <div className={classes["product-data"]}>
      <SneakerDetailsName
        name={name}
        details={details}
        retailPrice={retailPrice}
      />
      <SneakerDetailsForm
        sizeRange={sizeRange}
        onAddToCart={addToCartHandler}
      />
      <SimpleLine />
      <SneakerDetailsDescription
        props={{
          releaseDate: getTimeFromStamp(releaseDateUnix),
          sku,
          designer,
          nickname,
          details,
          color,
          upperMaterial,
          category,
        }}
      />
      <SimpleLine />
    </div>
  );
};

export default SneakerProductData;
