import "./navbar.css";
import React, { useRef } from "react";
import Toggle from "./toggle";

const NavBar = ({ logo, theme, setTheme }) => {
  const menudot = useRef();

  const handleClick = (e) => {
    menudot.current.classList.toggle("open");
  };

  return (
    <div className="nav">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="#00cbcb"
        onClick={handleClick}
        ref={menudot}
      >
        <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
      </svg>

      <img
        src={logo}
        alt="App Logo"
        width="60"
        style={{ background: "none" }}
      />

      <Toggle theme={theme} setTheme={setTheme}></Toggle>
    </div>
  );
};

export default NavBar;
