import React, { useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMenu } from "react-icons/ai";

import NavigationLink from "./NavigationLink";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElement/Backdrop";

export default function MainNavigation() {
  const location = useLocation();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLoginRoute = () => {
    history.push("/auth");
  };

  const handleSignupRoute = () => {
    history.push("/auth/signup");
  };

  const AuthNavbar = () => {
    return (
      <div className="bg-white-main shadow-md w-full px-6 lg:px-10 py-5 flex flex-row-reverse lg:flex-row justify-between items-center">
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-12">
          <button
            onClick={handleLoginRoute}
            className="bg-white-main hover:bg-black-main duration-200 hover:text-white-main border border-black-main text-black-main pt-1.5 pb-2 px-6"
          >
            Log in
          </button>
          <button
            onClick={handleSignupRoute}
            className="bg-black-main border-black-main text-white-main pt-1.5 pb-2 px-6"
          >
            Sign up
          </button>
        </nav>

        {/* MOBILE */}
        <button
          className="block lg:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>
    );
  };

  const MainNavbar = () => {
    return (
      <div
        className={`${
          location.pathname === "/"
            ? "bg-primary-surface"
            : "bg-white-main shadow-md"
        } w-full px-6 lg:px-10 py-5 flex flex-row-reverse lg:flex-row justify-between items-center`}
      >
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-12">
          <NavigationLink path="/places/new" content="My places" />
          <Link to="/places/new">
            <AiOutlinePlusCircle size={24} />
          </Link>
          <button
            onClick={handleLoginRoute}
            className="bg-black-main text-white-main pt-1.5 pb-2 px-6"
          >
            Log in
          </button>
        </nav>

        {/* MOBILE */}
        <button
          className="block lg:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>
    );
  };

  return (
    <React.Fragment>
      {isDrawerOpen && <Backdrop handleClick={() => setIsDrawerOpen(false)} />}
      <SideDrawer show={isDrawerOpen}>
        <nav onClick={() => setIsDrawerOpen(false)}>
          <NavigationLink path="/places/new" content="My places" />
          <Link to="/places/new">
            <AiOutlinePlusCircle size={24} />
          </Link>
          <nav className="flex flex-col items-center space-x-12">
            <button
              onClick={handleLoginRoute}
              className="bg-white-main hover:bg-black-main duration-200 hover:text-white-main border border-black-main text-black-main pt-1.5 pb-2 px-6"
            >
              Log in
            </button>
            <button
              onClick={handleSignupRoute}
              className="bg-black-main border-black-main text-white-main pt-1.5 pb-2 px-6"
            >
              Sign up
            </button>
          </nav>
        </nav>
      </SideDrawer>

      {/* MAIN NAVBAR */}
      {location.pathname === "/auth" ? <AuthNavbar /> : <MainNavbar />}
    </React.Fragment>
  );
}
