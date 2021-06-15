import "./app.css";
import NavBar from "./navbar";
import logo from "../assets/LibHood.png";
import React, { useState } from "react";

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

  return <NavBar logo={logo} theme={theme} setTheme={setTheme}></NavBar>;
};

export default App;
