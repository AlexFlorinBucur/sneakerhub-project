import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setErrorMsg("");
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const errorMessageHandler = (error) => {
    if (!hasError) {
      setErrorMsg(error);
    }
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    // hasError: hasError,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    errorMessageHandler,
    errorMsg,
  };
};

export default useInput;
