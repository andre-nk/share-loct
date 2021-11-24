import React, { useCallback, useReducer } from "react";
import { AiOutlinePicture } from "react-icons/ai";

import Input from "../../shared/components/FormElement/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export default function NewPlace() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="w-full h-auto flex flex-col-reverse lg:flex lg:flex-row justify-between lg:space-x-16 bg-white-main border-black-main border py-5 px-4 lg:py-14 lg:px-16">
      <form
        onSubmit={submitHandler}
        className="w-full mt-6 lg:mt-0 lg:w-5/12 flex flex-col justify-between"
      >
        <Input
          id="title"
          rows={2}
          type="text"
          placeholder={"Post title..."}
          className="w-full outline-none bg-none text-xl px-4 lg:px-0 lg:text-3xl font-serif font-semibold resize-none"
          errorMessage={"Please enter a title"}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(60)]}
          onInput={inputHandler}
        />

        {/* fetch user name here... */}
        <p className="text-sm lg:text-md px-4 lg:px-0">
          posted by: <span className="font-medium">Jesse Pinkman</span>
        </p>
        <Input
          id="description"
          rows={8}
          type="text"
          placeholder={"Write your post description here..."}
          className="w-full text-sm lg:text-md mt-4 px-4 lg:px-0 outline-none bg-none resize-none"
          errorMessage={"Please type some description for this post"}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(1000)]}
          onInput={inputHandler}
        />
        <p className="border-t text-sm font-medium mx-4 lg:mx-0 border-gray-main pt-3 pb-2">Location's Address:</p>
        <Input
          id="address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorMessage={"Please enter a valid address"}
          onInput={inputHandler}
          className="text-sm outline-none px-4 lg:px-0 caret-black w-full pb-3.5"
        />
        <button
          type="submit"
          disabled={!formState.isValid}
          className="bg-black-main mt-6 py-3 text-white-main disabled:opacity-80"
        >
          Create post
        </button>
      </form>
      <div className="w-full flex justify-center items-center h-64 lg:h-auto lg:w-7/12 p-2 border border-dashed border-gray-main bg-white-sub">
        <span className="flex flex-col justify-center space-y-4 items-center">
          <AiOutlinePicture className="text-3xl text-gray-main" />
          <h2 className="text-center text-gray-main">
            Add the location's photos here...
          </h2>
        </span>
      </div>
    </div>
  );
}
