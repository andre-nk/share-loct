import React from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElement/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

export default function Auth() {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="h-auto w-10/12 lg:w-5/12 bg-white-main border border-black-main flex flex-col justify-center items-center pt-12 pb-10 px-4">
        <h2 className="text-2xl lg:text-3xl font-semibold font-serif">Log in</h2>
        <p className="text-md lg:text-lg pt-3 text-center">
          and become a certified virtual wanderluster...
        </p>
        <form onSubmit={authSubmitHandler} className="w-full px-6 mt-8">
          <Input
            className="w-full border border-black-main py-3.5 px-4 text-sm lg:text-md"
            placeholder="E-mail address"
            id="email"
            type="email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="Please enter a valid e-mail address"
            onInput={inputHandler}
          />
          <Input
            className="w-full border border-black-main mt-4 py-3.5 px-4 text-sm lg:text-md"
            id="password"
            placeholder="Password"
            type="password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="Please enter a valid password (at least 5 characters)"
            onInput={inputHandler}
          />
          <button
            type="submit"
            className="bg-primary-light w-full mt-8 py-3.5 text-mds text-white-main disabled:opacity-80"
          >
            Log in
          </button>
          <div className="mt-8 flex flex-col space-y-2 text-center text-sm lg:text-md underline justify-center items-center">
            <p>Need a help?</p>
            <p>Forgot your password?</p>
          </div>
        </form>
      </div>
    </div>
  );
}
