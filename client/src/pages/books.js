import React, { useState, useEffect } from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books/me")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <>
      <div className="card">
        <ExtendDrop msg="my books" default={true}>
          {JSON.stringify(books.books)}
        </ExtendDrop>
        <ExtendDrop msg="my requests" default={false}>
          REQUESTS
        </ExtendDrop>
      </div>
    </>
  );
};

export default Books;
