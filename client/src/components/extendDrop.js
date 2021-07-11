import "./extendDrop.css";
import React, { useState } from "react";

const ExtendDrop = ({ msg, children }) => {
  const [drop, setDrop] = useState(true);
  return (
    <div>
      <div onClick={() => setDrop(!drop)} className="extendDrop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="var(--background-plus)"
        >
          <path d="M24 22h-24l12-20z" />
        </svg>
        <span>{msg}</span>
        <hr />
      </div>
      {drop ? <div className="drop-content">{children}</div> : null}
    </div>
  );
};

export default ExtendDrop;
