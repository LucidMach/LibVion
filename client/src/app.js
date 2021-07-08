import "./app.css";
import NavBar from "./components/navbar";
import logo from "./assets/LibHood.png";
import React, { useState } from "react";
import Search from "./pages/search";
import Books from "./pages/books";
import Profile from "./pages/profile";
import SignIn from "./pages/signin";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const app = document.querySelector(":root");
  if (theme === "dark") {
    app.style.setProperty("--background", "#3a3a3a");
    app.style.setProperty("--background-plus", "#1a1a1a");
    app.style.setProperty("--accent", "#f1f1f1");
    app.style.setProperty("--accent-plus", "#ffffff");
  } else {
    app.style.setProperty("--accent", "#3a3a3a");
    app.style.setProperty("--accent-plus", "#1a1a1a");
    app.style.setProperty("--background", "#f1f1f1");
    app.style.setProperty("--background-plus", "#ffffff");
  }

  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <BrowserRouter>
      <NavBar logo={logo} theme={theme} setTheme={setTheme}></NavBar>
      <Switch>
        <div style={bodyStyle}>
          <Route path="/search" component={Search} />
          <Route path="/books" component={Books} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" component={SignIn} />
          <Route path="/" exact render={() => <h1>home</h1>} />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
