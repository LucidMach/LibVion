import "./extendDrop.css";
import React from "react";

const ExtendDrop = ({ msg, content }) => {
  return (
    <React.Fragment>
      <div className="extendDrop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="var(--background-plus)"
        >
          <path d="M24 22h-24l12-20z" />
        </svg>
        {msg}
        <hr />
      </div>

      <div className="content show">{content}</div>
    </React.Fragment>
  );
};

export default ExtendDrop;
