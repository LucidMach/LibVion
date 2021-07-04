import "./menu.css";
import React from "react";
import { Link } from "react-router-dom";

const Menu = React.forwardRef(({ top, bottom }, ref) => {
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

  return (
    <div className="menu" ref={ref}>
      <div className="top">{renderTop}</div>
      <div className="bottom">{renderBottom}</div>
    </div>
  );
});

export default Menu;
