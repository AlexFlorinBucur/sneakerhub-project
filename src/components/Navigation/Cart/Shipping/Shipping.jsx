import React from "react";
import Input from "../../../UI/Input";
import useInput from "../../../../hooks/useInput";
import classes from "./Shipping.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
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

  const resetForm = () => {
    resetPostalCodeInput();
    resetCityInput();
    resetPhoneNoInput();
    resetStreetInput();
    resetLastNameInput();
    resetFirstNameInput();
  };

  useEffect(() => {
    resetForm();
  }, [isLoggedIn]);

  return (
    <>
      <h3>Shipping Information</h3>
      <div className={classes["shipping-adress"]}>
        <Input
          input={{
            type: "text",
            id: "lastName",
            required: "required",
            value: lastNameValue,
            // onChange: lastNameChangedHandler,
            onChange: (e) => {
              lastNameChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                lastName: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                lastNameNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: lastNameBlurHandler,
          }}
          label={{
            htmlFor: "lastName",
            text: "Last Name",
          }}
          hasError={lastNameHasError}
          errorMsg={lastNameHasError && "Complete This Input"}
          inputValidityClass={classes.invalid}
        />
        <Input
          input={{
            type: "text",
            id: "firstName",
            required: "required",
            value: firstNameValue,
            // onChange: firstNameChangedHandler,
            onChange: (e) => {
              firstNameChangedHandler(e);
              setShippingInfo((prev) => ({
                ...prev,
                firstName: e.target.value,
              }));
              setInputError((prev) => ({
                ...prev,
                firstNameNoError: validateCharacters(e.target.value),
              }));
            },
            onBlur: firstNameBlurHandler,
          }}
          label={{
            htmlFor: "firstName",
            text: "First Name",
          }}
          hasError={firstNameHasError}
          errorMsg={firstNameHasError && "Complete This Input"}
          inputValidityClass={classes.invalid}
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
          inputValidityClass={classes.invalid}
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
          inputValidityClass={classes.invalid}
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
          inputValidityClass={classes.invalid}
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
          inputValidityClass={classes.invalid}
        />
      </div>
    </>
  );
};

export default Shipping;
