import "./menu.css";
import React from "react";

const Menu = React.forwardRef(({ top, bottom }, ref) => {
  const renderTop = top.map((icon) => (
    <div className="icon" key={icon.title}>
      {icon.svg}
    </div>
  ));

  const renderBottom = bottom.map((icon) => (
    <div className="icon" key={icon.title}>
      {icon.svg}
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
