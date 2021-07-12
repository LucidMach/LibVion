import "./navbar.css";
import React, { useEffect, useRef, useState } from "react";
import Toggle from "./toggle";
import Menu from "./menu";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

const NavBar = ({ logo, theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const menuRef = useRef();
  const menudot = useRef();

  const history = useHistory();

  const logout = () => {
    auth.signOut();
    fetch("/session/logout")
      .then((res) => res.json())
      .then((data) => {
        data.success
          ? alert("logged out successfully!")
          : alert("something wrong happened on server-side");
      });
    history.push("/");
  };

  const toggleMenu = () => {
    menudot.current.classList.toggle("open");
    setOpen(!open);
    menuRef.current.classList.toggle("show");
  };

  useEffect(() => {
    if (window.innerWidth < 600) toggleMenu();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => toggleMenu();

  const top = user
    ? [
        {
          title: "Search",
          url: "/search",
          onClick: toggleMenu,
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#00cbcb"
            >
              <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
            </svg>
          ),
        },
        {
          title: "Books",
          url: "/books",
          onClick: toggleMenu,
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#00cbcb"
            >
              <path d="M5.495 2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505c-1.375 0-1.375-2 0-2zm.505 4h14v16h-14v-16z" />
            </svg>
          ),
        },
        {
          title: "Requests",
          url: "./notifications",
          onClick: toggleMenu,
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#00cbcb"
            >
              <path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z" />
            </svg>
          ),
        },
      ]
    : [];

  const bottom = !user
    ? [
        {
          title: "Log In",
          url: "/login",
          onClick: toggleMenu,
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="var(--background-plus)"
            >
              <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "Profile",
          url: "/profile",
          onClick: toggleMenu,
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="var(--background-plus)"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
            </svg>
          ),
        },
        {
          title: "Sign Out",
          onClick: logout,
          url: "#",
          svg: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="var(--background-plus)"
            >
              <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
            </svg>
          ),
        },
      ];

  return (
    <React.Fragment>
      <div className="nav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="#00cbcb"
          onClick={handleClick}
          ref={menudot}
        >
          <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
        </svg>

        <img
          src={logo}
          alt="App Logo"
          width="60"
          style={{ background: "none" }}
        />

        <Toggle theme={theme} setTheme={setTheme}></Toggle>
      </div>
      <Menu top={top} bottom={bottom} ref={menuRef}></Menu>
    </React.Fragment>
  );
};

export default NavBar;
