import React, { useEffect } from "react";
import ExtendDrop from "../components/extendDrop";

const Books = () => {

  const getBookInfo = id => {
    fetch(`/books/${id}`)
      .then(res => res.json())
      .then(data => {
          console.log("name: ", data.data.name)
          console.log("author: ",data.data.author)
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
    <>
    <React.Fragment>
      <ExtendDrop msg="my books" default={true}>
        BOOKS
      </ExtendDrop>
      <ExtendDrop msg="my requests" default={false}>
        REQUESTS
      </ExtendDrop>
    </React.Fragment>
    </>
  );
};

export default Books;
