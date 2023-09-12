import React from "react";
import Input from "../../../UI/Input";
import useInput from "../../../../hooks/useInput";
import classes from "./Shipping.module.css";

const validatePhone = (phoneNo) => {
  const pattern = /^(?:(?:\+40\s*7\d{8})|(?:07\d{8}))$/;
  return pattern.test(phoneNo);
};
const validatePostalCode = (postalCode) => {
  const pattern = /^[0-9]{6}$/;
  return pattern.test(postalCode);
};

const validateCharacters = (char) => {
  return char.length > 0;
};

const Shipping = ({ setShippingInfo, setInputError }) => {
  const {
    value: lastnameValue,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangedHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastnameInput,
  } = useInput((value) => value);

  const {
    value: surnameValue,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueChangeHandler: surnameChangedHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: resetSurnameInput,
  } = useInput((value) => value);

  const {
    value: phoneNoValue,
    isValid: phoneNoIsValid,
    hasError: phoneNoHasError,
    valueChangeHandler: phoneNoChangedHandler,
    inputBlurHandler: phoneNoBlurHandler,
    reset: resetPhoneNoInput,
  } = useInput((value) => validatePhone(value));

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value);

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput((value) => validatePostalCode(value));

  const lastnameInputClasses = lastnameHasError ? classes.invalid : "";
  const surnameInputClasses = surnameHasError ? classes.invalid : "";
  const phoneNoInputClasses = phoneNoHasError ? classes.invalid : "";
  const cityInputClasses = cityHasError ? classes.invalid : "";
  const streetInputClasses = streetHasError ? classes.invalid : "";
  const postalCodeInputClasses = postalCodeHasError ? classes.invalid : "";

  return (
    <>
      <h3>Shipping Information</h3>
      <div className={classes["shipping-adress"]}>
        <Input
          input={{
            type: "text",
            id: "lastname",
            required: "required",
            value: lastnameValue,
            // onChange: lastnameChangedHandler,
            onChange: (e) => {
              lastnameChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                lastname: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                lastnameNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: lastnameBlurHandler,
          }}
          label={{
            htmlFor: "lastname",
            text: "Lastname",
          }}
          hasError={lastnameHasError}
          errorMsg={lastnameHasError && "Complete This Input"}
          inputValidityClass={lastnameInputClasses}
        />
        <Input
          input={{
            type: "text",
            id: "surname",
            required: "required",
            value: surnameValue,
            // onChange: surnameChangedHandler,
            onChange: (e) => {
              surnameChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                surname: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                surnameNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: surnameBlurHandler,
          }}
          label={{
            htmlFor: "surname",
            text: "Surname",
          }}
          hasError={surnameHasError}
          errorMsg={surnameHasError && "Complete This Input"}
          inputValidityClass={surnameInputClasses}
        />
        <Input
          input={{
            type: "tel",
            id: "phoneNo",
            required: "required",
            value: phoneNoValue,
            // onChange: phoneNoChangedHandler,
            onChange: (e) => {
              phoneNoChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                phone: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                phoneNoError: validatePhone(e.target.value),
              }));
            },
            onBlur: phoneNoBlurHandler,
          }}
          label={{
            htmlFor: "phoneNo",
            text: "Phone Number",
          }}
          hasError={phoneNoHasError}
          errorMsg={phoneNoHasError && "Incorect phone number!"}
          inputValidityClass={phoneNoInputClasses}
        />
        <Input
          input={{
            type: "text",
            id: "city",
            required: "required",
            value: cityValue,
            // onChange: cityChangedHandler,
            onChange: (e) => {
              cityChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                city: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                cityNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: cityBlurHandler,
          }}
          label={{
            htmlFor: "city",
            text: "City",
          }}
          hasError={cityHasError}
          errorMsg={cityHasError && "Complete This Input"}
          inputValidityClass={cityInputClasses}
        />
        <Input
          input={{
            type: "text",
            id: "street",
            required: "required",
            value: streetValue,
            // onChange: streetChangedHandler,
            onChange: (e) => {
              streetChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                street: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                streetNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: streetBlurHandler,
          }}
          label={{
            htmlFor: "street",
            text: "Adress",
          }}
          hasError={streetHasError}
          errorMsg={streetHasError && "Complete This Input"}
          inputValidityClass={streetInputClasses}
        />{" "}
        <Input
          input={{
            type: "text",
            id: "postalCode",
            required: "required",
            value: postalCodeValue,
            // onChange: postalCodeChangedHandler,
            onChange: (e) => {
              postalCodeChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                postalCodeNoError: validatePostalCode(e.target.value),
              }));
            },
            onBlur: postalCodeBlurHandler,
          }}
          label={{
            htmlFor: "postalCode",
            text: "Postal Code",
          }}
          hasError={postalCodeHasError}
          errorMsg={
            postalCodeHasError &&
            "Invalid postal code. Please enter a valid 6-digit postal code."
          }
          inputValidityClass={postalCodeInputClasses}
        />
      </div>
    </>
  );
};

export default Shipping;
