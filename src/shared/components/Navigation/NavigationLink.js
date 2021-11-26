import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavigationLink({ path, content, last }) {
  const location = useLocation();

  return (
    <NavLink to={path}>
      <p className={`text-md px-4 ${location.pathname === path ? "font-medium sm:bg-gray-200 lg:bg-white" : "font-normal"} ${last ? "border-t border-b" : "border-t"} py-4 lg:py-0  border-opacity-50 lg:border-none border-gray-main`}>{content}</p>
    </NavLink>
  );
}
