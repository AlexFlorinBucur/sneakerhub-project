import SneakerDetailsName from "../SneakerDetailsName/SneakerDetailsName";
import SneakerDetailsForm from "../SneakerDetailsForm/SneakerDetailsForm";
import SimpleLine from "../../UI/SimpleLine";
import SneakerDetailsDescription from "../SneakerDetailsDescription/SneakerDetailsDescription";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";
import { toast } from "react-toastify";
import { getTimeFromStamp } from "../../../helpers/get-time";
import { useCallback } from "react";

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

  const addToCartHandler = useCallback((size) => {
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
  }, []);

  return (
    <div>
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
