import React, { useState, useEffect } from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books/me')
      .then(res => res.json())
      .then(data => {
        if(data.books) {
          console.log(books)
        }
        else
          console.log('no books issued');
      })
  }, []);

  return (
    <>
    <React.Fragment>
      <ExtendDrop msg="my books" default={true}>
        {
          books ?
          books.map((book, index) => 
            <div key={index} style={bookStyle}>
              <h1>{book.name}</h1>
              <p>{book.author}</p>
            </div>  
          ) :
          "no books issued"
        }
      </ExtendDrop>
      <ExtendDrop msg="my requests" default={false}>
        REQUESTS
      </ExtendDrop>
    </React.Fragment>
    </>
  );
};

export default Books;

const bookStyle = {
  display: "grid",
  gap: ".5em",
  padding: "8px 16px",
  margin: "5px 0",
  border: "1px solid lightgrey",
  width: "max-content",
  textAlign: "center"
}