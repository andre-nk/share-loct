import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export default function Input({
  element,
  id,
  type,
  placeholder,
  rows,
  className,
  errorMessage,
  validators,
  onInput,
  inputValue,
  valid
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: inputValue || "", 
    isValid: valid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const inputElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        value={inputState.value}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        className={
          className ||
          "outline-none caret-black w-full px-4 py-3.5 bg-white-sub"
        }
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        value={inputState.value}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        className={
          className ||
          "outline-none caret-black w-full px-4 py-3.5 bg-white-sub"
        }
      />
    );

  return (
    <div>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && errorMessage && (
        <p className="mb-4 italic text-danger-light font-light text-sm">
          *{errorMessage}
        </p>
      )}
    </div>
  );
}
