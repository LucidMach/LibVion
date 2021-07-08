import "./menu.css";
import React from "react";
import { Link } from "react-router-dom";

const Menu = React.forwardRef(({ top, bottom }, ref) => {
  console.log(window.innerHeight);

  const renderTop = top.map((icon) => (
    <div className="icon" key={icon.title} onClick={icon.onClick}>
      <Link to={icon.url}>{icon.svg}</Link>
    </div>
  ));

  const renderBottom = bottom.map((icon) => (
    <div className="icon" key={icon.title} onClick={icon.onClick}>
      <Link to={icon.url}>{icon.svg}</Link>
    </div>
  ));

  const menuStyle = {
    height: window.innerHeight - 80,
  };

  return (
    <div className="menu" style={menuStyle} ref={ref}>
      <div className="top">{renderTop}</div>
      <div className="bottom">{renderBottom}</div>
    </div>
  );
});

export default Menu;
