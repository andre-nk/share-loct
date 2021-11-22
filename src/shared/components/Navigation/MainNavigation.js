import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMenu } from "react-icons/ai";

import NavigationLink from "./NavigationLink";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElement/Backdrop";

export default function MainNavigation() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <React.Fragment>
      {isDrawerOpen && <Backdrop handleClick={() => setIsDrawerOpen(false)} />}
      <SideDrawer show={isDrawerOpen}>
        <nav onClick={() => setIsDrawerOpen(false)}>
          <NavigationLink path="/places/new" content="My places" />
          <Link to="/places/new">
            <AiOutlinePlusCircle size={24} />
          </Link>
          <button className="bg-black-main text-white-main pt-2 pb-2.5 px-7">
            Log in
          </button>
        </nav>
      </SideDrawer>

      {/* MAIN NAVBAR */}
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
          <button className="bg-black-main text-white-main pt-1.5 pb-2 px-6">
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
    </React.Fragment>
  );
}
