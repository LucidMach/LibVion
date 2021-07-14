import React, { useEffect, useState } from "react";

const Search = () => {
  const [books, setBooks] = useState([]);


  useEffect(() => {
    fetch('/books')
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }, []);

  return (
    <>
      <h1>Search</h1>
      {
        books ?
        books.map((book, index) => 
          <div key={index} style={bookStyle}>
            <h1>{book.name}</h1>
            <p>{book.author}</p>
          </div>  
        ) :
        "no books available"
      }
    </>
  );
};

export default Search;

const bookStyle = {
  display: "grid",
  gap: ".5em",
  padding: "8px 16px",
  margin: "5px 0",
  border: "1px solid lightgrey",
  width: "max-content",
  textAlign: "center"
}