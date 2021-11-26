import React, { useState, useContext } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElement/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/AuthContext";

export default function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
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
    if(formState.isValid){
      auth.login();
    }
  };

  const switchModeHandler = (e) => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="h-auto w-10/12 lg:w-5/12 bg-white-main border border-black-main flex flex-col justify-center items-center pt-12 pb-10 px-4">
        <h2 className="text-2xl lg:text-3xl font-semibold font-serif">
          {isLoginMode ? "Login" : "Create your account"}
        </h2>
        <p className="text-md lg:text-lg pt-3 text-center">
          and become a certified virtual wanderluster...
        </p>
        <form onSubmit={authSubmitHandler} className="w-full px-6 mt-8">
          {!isLoginMode && (
            <Input
              className="w-full border border-black-main py-3.5 px-4 text-sm lg:text-base"
              placeholder="Your display name"
              id="name"
              type="text"
              element="input"
              autofocus="false"
              validators={[VALIDATOR_REQUIRE()]}
              errorMessage="Please fill your display name"
              onInput={inputHandler}
            />
          )}
          <Input
            className="w-full border border-black-main py-3.5 mt-4 px-4 text-sm lg:text-base"
            placeholder="E-mail address"
            id="email"
            type="email"
            element="input"
            autofocus="false"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="Please enter a valid e-mail address"
            onInput={inputHandler}
          />
          <Input
            className="w-full border border-black-main mt-4 py-3.5 px-4 text-sm lg:text-base"
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
            className="bg-primary-light w-full mt-8 py-3.5 text-white-main disabled:opacity-80"
          >
            {isLoginMode ? "Log in" : "Create your account"}
          </button>
          <div className="mt-8 flex flex-col space-y-2 text-center text-sm lg:text-base justify-center items-center">
            {isLoginMode ? (
              <p>
                Doesn't have an account yet?{" "}
                <span
                  onClick={switchModeHandler}
                  className="underline text-info-light"
                >
                  Sign up!
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={switchModeHandler}
                  className="underline text-info-light"
                >
                  Log in!
                </span>
              </p>
            )}
            <p className="underline">Forgot your password?</p>
          </div>
        </form>
      </div>
    </div>
  );
}
