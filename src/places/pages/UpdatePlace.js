import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import CustomLoader from "../../shared/components/UIElement/Loader";
import ErrorMessage from "../../shared/components/FormElement/ErrorMessage";
import ErrorState from "../../shared/pages/Error/ErrorState";
import { AuthContext } from "../../shared/context/AuthContext";

export default function UpdatePlace() {
  const history = useHistory();
  const { placeId } = useParams();
  const auth = useContext(AuthContext);
  const [identifiedPlace, setIdentifiedPlace] = useState(null);
  const { isLoading, isError, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:2000/api/places/${placeId}`
        );
        setIdentifiedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchPlace();
  }, [sendRequest, setFormData, placeId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try{
      await sendRequest(
        `http://localhost:2000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push(`/${auth.userInstance.id}/places`);
    } catch (err){

    }
  }; 

  if (!identifiedPlace) {
    return (
      <ErrorState
        title={
          "Failed to load this place."
        }
        message={
          "Please try reloading this page"
        }
        btnMessage={"Try again"}
        onClick={() => {
          window.location.reload();
        }}
      />
    );
  }

  console.log(isLoading);

  return (
    <React.Fragment>
      <CustomLoader isLoading={isLoading} />
      <div className="w-full h-auto flex flex-col-reverse lg:flex lg:flex-row justify-between lg:space-x-16 bg-white-main border-black-main border py-5 px-4 lg:py-14 lg:px-16">
        {formState.inputs.title.value && (
          <form
            onSubmit={submitHandler}
            className="w-full mt-6 lg:mt-0 lg:w-5/12 flex flex-col justify-between"
          >
            <Input
              rows={2}
              id="title"
              type="text"
              onInput={inputHandler}
              placeholder={"Post title..."}
              errorMessage={"Please enter a title"}
              valid={formState.inputs.title.isValid}
              inputValue={formState.inputs.title.value}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(60)]}
              className="w-full outline-none bg-none text-xl px-4 lg:px-0 lg:text-3xl font-serif font-semibold resize-none"
            />

            {/* fetch user name here... */}
            <p className="text-sm lg:text-md px-4 lg:px-0">
              posted by: <span className="font-medium">Jesse Pinkman</span>
            </p>
            <Input
              rows={8}
              type="text"
              id="description"
              onInput={inputHandler}
              inputValue={formState.inputs.description.value}
              valid={formState.inputs.description.isValid}
              placeholder={"Write your post description here..."}
              errorMessage={"Please type some description for this post"}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(1000)]}
              className="w-full text-sm lg:text-md mt-4 px-4 lg:px-0 outline-none bg-none resize-none"
            />
            <button
              type="submit"
              className="bg-black-main mt-6 py-3 text-white-main disabled:opacity-80"
            >
              Update post
            </button>
            <ErrorMessage isError={isError} />
          </form>
        )}
        <div className="w-full flex justify-center items-center h-64 lg:h-auto lg:w-7/12 p-2 border border-dashed border-gray-main bg-white-sub">
          <img
            className="object-cover w-full h-full"
            src={identifiedPlace.image}
            alt={identifiedPlace.title}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
