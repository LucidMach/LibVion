import "./app.css";
import NavBar from "./components/navbar";
import logo from "./assets/LibHood.png";

import React, { useState } from "react";

//  firebase pkgs
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Search from "./pages/search";
import Books from "./pages/books";
import Profile from "./pages/profile";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Recover from "./pages/recover";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [user] = useAuthState(auth);  //  keeps track of user state 👻
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

  return (
    <BrowserRouter>
      <div style={bodyStyle}>
        <NavBar logo={logo} theme={theme} setTheme={setTheme}></NavBar>
        <Switch>
          <Route path="/" exact render={() => <h1>home</h1>} />
          <Route path="/search" component={user?Search:null} /> {/* component routes for authenticated user 👇 */}
          <Route path="/books" component={user?Books:null} />
          <Route path="/profile" component={user?Profile:null} />
          <Route path="/signup" component={user?null:SignUp} /> {/* component routes for unauthenticated user 👇 */}
          <Route path="/login" component={user?null:LogIn} />
          <Route path="/recover" component={user?null:Recover} />
          )
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
