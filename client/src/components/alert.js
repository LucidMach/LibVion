import React from "react";

const Alert = ({ msg, color, bgColor }) => {
  const alertStyle = {
    color: color,
    background: bgColor,
    position: "fixed",
    bottom: "40px",
    padding: "0.25rem 0.5rem",
    borderRadius: "1rem",
    border: msg ? null : `2px solid ${color}`,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="alert" style={alertStyle}>
        {msg}
      </div>
    </div>
  );
};

export default Alert;
