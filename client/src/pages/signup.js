import "./signin.css";
import Password from "../components/password";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const validation = () => {
    if (password.length > 6 && password === cpassword) {
      return true;
    }
    return false;
  };

  // const signup = (e) => {
  //   e.preventDefault();
  //   if (validation()) {
  //     // configuration for req;
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // withCredentials: true,
  //       credentials: "include",
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         displayName: username,
  //       }),
  //     };
  //     //  send req.
  //     fetch("/session/signup", requestOptions)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         data.success ? alert("user created successfully") : alert(data.error);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   //  validation failed
  //   else {
  //     alert("recheck form before submitting");
  //     setEmail("");
  //     setUsername("");
  //     setPassword("");
  //     setCpassword("");
  //   }
  // };

  const signup = (e) => {
    e.preventDefault();
    if (validation) {
      console.log({ username, password, cpassword, email });
    } else {
      console.log("ERROR");
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={signup} method="POST">
          <h1>Sign Up</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Your Username"
            autoComplete="none"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email-ID"
            autoComplete="none"
            required
          />
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          ></Password>
          <Password
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder="Confirm Your Password"
          ></Password>
          <button>Sign Up</button>
          <br />
        </form>
      </div>
      <p style={{ textAlign: "center" }}>
        Have An Account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
};

export default SignIn;
