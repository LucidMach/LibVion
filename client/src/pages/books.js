import React from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  return (
    <div className="card" style={{ position: "relative", top: 80 }}>
      <ExtendDrop msg="my books" default={true}>
        BOOKS
      </ExtendDrop>
      <ExtendDrop msg="my requests" default={false}>
        REQUESTS
      </ExtendDrop>
    </div>
  );
};

export default Books;
