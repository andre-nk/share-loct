import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function SideDrawer(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="fixed block lg:hidden p-6 left-0 top-0 z-40 h-full w-9/12 bg-white-main shadow-2xl">
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}
