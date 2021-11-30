import React, { useState, useContext } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMenu } from "react-icons/ai";

import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElement/Backdrop";
import NavigationLink from "./NavigationLink";
import { AuthContext } from "../../context/AuthContext";

export default function MainNavigation() {
  const location = useLocation();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const auth = useContext(AuthContext);

  const handleLoginRoute = () => {
    history.push("/auth");
  };

  const handleLogoutRoute = () => {
    auth.logout();
    history.push("/auth");
  }

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
          {auth.isLoggedIn ? (
            <div className="hidden lg:flex flex-row-reverse items-center space-x-12">
              <button
                onClick={() => {
                  auth.logout();
                }}
                className="bg-black-main text-white-main pt-1.5 pb-2 px-6 ml-12"
              >
                Log out
              </button>
              <NavigationLink path="/u1/places" content="My places" />
              <Link to="/places/new">
                <AiOutlinePlusCircle size={24} />
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLoginRoute}
              className="bg-black-main text-white-main pt-1.5 pb-2 px-6"
            >
              Log in
            </button>
          )}
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
        <div
          className="flex flex-col justify-between content-between h-full"
          onClick={() => setIsDrawerOpen(false)}
        >
          <nav>
            <NavigationLink path="/u1/places" content="My places" />
            <NavigationLink
              last={true}
              path="/places/new"
              content="Add a new place"
            />
          </nav>
          {auth.isLoggedIn ? (
            <div className="px-6 w-full">
              <button
                onClick={handleLogoutRoute}
                className="bg-white-main w-full hover:bg-black-main duration-200 hover:text-white-main border border-black-main text-black-main py-2.5"
              >
                Log out
              </button>
            </div>
          ) : (
            <nav className="flex flex-col space-y-4 items-center w-full px-6">
              <button
                onClick={handleLoginRoute}
                className="bg-white-main w-full hover:bg-black-main duration-200 hover:text-white-main border border-black-main text-black-main py-2.5"
              >
                Log in
              </button>
              <button
                onClick={handleLogoutRoute}
                className="bg-black-main w-full border-black-main text-white-main py-2.5"
              >
                Sign up
              </button>
            </nav>
          )}
        </div>
      </SideDrawer>

      {/* MAIN NAVBAR */}
      <MainNavbar />
    </React.Fragment>
  );
}
