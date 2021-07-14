import React, { useEffect } from "react";

const Search = () => {

  useEffect(() => {
    fetch('/books')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  });

  return <h1>Search</h1>;
};

export default Search;
