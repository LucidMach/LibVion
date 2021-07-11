import "./signin.css";
import React, { useEffect, useState, useContext } from "react";

import Alert from "../components/alert";
import Password from "../components/password";
import { UserContext } from "../contexts/userContext";

import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  const [msg, setMsg] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => setMsg({}), 7000);
  }, [msg]);

  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const login = (e) => {
    e.preventDefault();
    // console.log({ email, password });
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user.user);
        setMsg({ msg: "Success", color: "#00f100", bgColor: "#a1f1a1" });
      })
      .catch((err) =>
        setMsg({ msg: err.message, color: "#c10000", bgColor: "#f1a1a1" })
      );
  };

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form onSubmit={login} method="POST">
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Password>
          <Link to="/recover" style={{ textAlign: "right" }}>
            forgot password ?
          </Link>
          <br />
          <button>Log In</button>
          <br />
        </form>
      </div>
      <p style={{ textAlign: "center" }}>
        Don't Have An Account? <Link to="/signup">Sign Up</Link>
      </p>
      {msg && <Alert msg={msg.msg} color={msg.color} bgColor={msg.bgColor} />}
    </div>
  );
};

export default SignIn;
