import React from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  return (
    <React.Fragment>
      <ExtendDrop msg="my books" content="books"></ExtendDrop>
      <ExtendDrop msg="my orders" content="orders"></ExtendDrop>
    </React.Fragment>
  );
};

export default Books;
