import "./toggle.css";
import React from "react";

const Toggle = ({ theme, setTheme }) => {
  const handleClick = () => {
    console.log(theme);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="toggle">
      <input
        type="checkbox"
        className="theme"
        id="theme-switch"
        onClick={handleClick}
      />
      <label htmlFor="theme-switch" className="switch">
        <span className="circle"></span>
      </label>
    </div>
  );
};

export default Toggle;
