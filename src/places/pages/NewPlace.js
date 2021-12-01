import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElement/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/AuthContext";
import CustomLoader from "../../shared/components/UIElement/Loader";
import ErrorMessage from "../../shared/components/FormElement/ErrorMessage";
import ImageUpload from "../../shared/components/FormElement/ImageUpload";

export default function NewPlace() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
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
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userInstance.id);
      await sendRequest(
        "http://localhost:2000/api/places/",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <CustomLoader isLoading={isLoading} />
      <div className="w-full h-auto flex flex-col-reverse lg:flex lg:flex-row justify-between lg:space-x-16 bg-white-main border-black-main border py-5 px-4 lg:py-14 lg:px-16">
        <form
          onSubmit={placeSubmitHandler}
          className="w-full mt-6 lg:mt-0 lg:w-6/12 flex flex-col justify-between"
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

          <p className="text-sm lg:text-md px-4 lg:px-0">
            posted by:{" "}
            <span className="font-medium">{auth.userInstance.name}</span>
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
          <p className="border-t text-sm font-medium mx-4 lg:mx-0 border-gray-main pt-3 pb-2">
            Location's Address:
          </p>

          <Input
            id="address"
            element="input"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage={"Please enter a valid address"}
            placeholder={"Enter the location's address here..."}
            className="text-sm outline-none px-4 lg:px-0 caret-black w-full pb-3.5"
          />

          <button
            type="submit"
            disabled={!formState.isValid}
            className="bg-black-main mt-6 py-3 text-white-main disabled:opacity-40"
          >
            Create post
          </button>
          <div className="mt-8">
            <ErrorMessage isError={isError} />
          </div>
        </form>

        <div className="lg:w-5/12">
          <ImageUpload id="image" onInput={inputHandler} />
        </div>
      </div>
    </React.Fragment>
  );
}
