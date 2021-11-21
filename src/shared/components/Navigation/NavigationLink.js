import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavigationLink({ path, content }) {
  const location = useLocation();

  return (
    <NavLink to={path}>
      <p className={`text-lg ${location.pathname === path ? "font-medium" : "font-normal"}`}>{content}</p>
    </NavLink>
  );
}
