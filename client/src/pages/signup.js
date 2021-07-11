import "./signin.css";

import React, { useState, useEffect } from "react";
import Password from "../components/password";

import Alert from "../components/alert";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [msg, setMsg] = useState({});


  const validation = (p, c) => {
    if (p.length > 6 && p === c) {
      return true;
    }
    return false;
  }

  const signup = e => {
    e.preventDefault();
    if(validation()) {

  useEffect(() => {
    setTimeout(() => setMsg({}), 10000);
  }, [msg]);

  const signup = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;
    if(validation(password, cpassword)) {
      // configuration for req;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      }
      //  send req.
      fetch('/session/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          data.success ?
          setMsg({ msg: "Success", color: "#00f100", bgColor: "#a1f1a1" }) :
          setMsg({ msg: data.error, color: "#c10000", bgColor: "#f1a1a1" })
        })
        .catch(err => setMsg({ msg: err.message, color: "#c10000", bgColor: "#f1a1a1" }));
    }
    //  validation failed
    else {
      setMsg({
        msg: "Please Check Your Passwords",
        color: "#c10000",
        bgColor: "#f1a1a1",
      });
    }
  }


  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
>>>>>>> cc4beeed2c48cb0446daef8c105e6eb5d000182c

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form onSubmit={signup} method="POST">
          <h1>Sign Up</h1>
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter you username" required/>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
            required
          />
          <Password
            name="password"
            placeholder="Enter Your Password"
          ></Password>
          <Password
            name="cpassword"
            placeholder="Confirm Your Password"
          ></Password>
          <button>Sign Up</button>
          <br />
        </form>
      </div>
      <p style={{ textAlign: "center" }}>
        Have An Account? <Link to="/login">Log In</Link>
      </p>
      {msg && <Alert msg={msg.msg} color={msg.color} bgColor={msg.bgColor} />}
    </div>
  );
};

export default SignIn;
