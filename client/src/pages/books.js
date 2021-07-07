import React from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  return (
    <React.Fragment>
      <ExtendDrop msg="my books" default={true}>
        BOOKS
      </ExtendDrop>
      <ExtendDrop msg="my requests" default={false}>
        REQUESTS
      </ExtendDrop>
    </React.Fragment>
  );
};

export default Books;
