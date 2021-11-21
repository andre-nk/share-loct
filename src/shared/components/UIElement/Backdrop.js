import React from "react";
import ReactDOM from "react-dom";

export default function Backdrop({ handleClick }) {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" onClick={handleClick}></div>,
    document.getElementById("backdrop-hook")
  );
}
