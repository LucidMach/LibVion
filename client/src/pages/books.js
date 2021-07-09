import React, { useState, useEffect } from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {
  // const [books, setBooks] = useState([null]);

  const getBookInfo = id => {
    fetch(`/books/${id}`)
      .then(res => res.json())
      .then(data => {
        // setBooks({
          console.log("name: ", data.data.name)
          console.log("author: ",data.data.author)
        // });
      });
  }

  useEffect(() => {
    fetch('/books/me')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        data.books.length > 0 ?
        data.books.forEach(book => {
          getBookInfo(book);
        }) :
        console.log('no books issued');
      })
  });

  return (
    <div style={coverStyle}>
    <React.Fragment>
      <ExtendDrop msg="my books" default={true}>
        
      </ExtendDrop>
      <ExtendDrop msg="my requests" default={false}>
        REQUESTS
      </ExtendDrop>
    </React.Fragment>
    </div>
  );
};

export default Books;

const coverStyle = {
  height: "50%",
  width: "80%",
  margin: "auto",
}