import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ErrorState from "../../shared/pages/Error/ErrorState";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export default function UpdatePlace() {
  const history = useHistory();
  const { placeId } = useParams();

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

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if(identifiedPlace){
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, identifiedPlace]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace || !formState.inputs.title.value) {
    return (
      <ErrorState
        title={"There is no associated place with this ID."}
        message={"Please recheck the ID and try again"}
        btnMessage={"Try again"}
        onClick={() => {
          history.push("/places/new");
        }}
      />
    );
  }

  return (
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
        </form>
      )}
      <div className="w-full flex justify-center items-center h-64 lg:h-auto lg:w-7/12 p-2 border border-dashed border-gray-main bg-white-sub">
        <img
          className="object-cover w-full h-full"
          src={identifiedPlace.imageUrl}
          alt={identifiedPlace.title}
        />
      </div>
    </div>
  );
}
