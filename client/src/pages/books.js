import React, { useState, useEffect } from "react";
import ExtendDrop from "../components/extendDrop";
import { Link, useLocation } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  let location = useLocation();

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
          <Link
            to="/books/add"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              background: "var(--foreground)",
              width: "90px",
              height: "140px",
              textDecoration: "none",
            }}
          >
            +
          </Link>
        </ExtendDrop>
        <ExtendDrop msg="my requests" default={false}>
          REQUESTS
        </ExtendDrop>
        {location.pathname === "/books/add" ? <h4>Book Form</h4> : null}
      </div>
    </>
  );
};

export default Books;
