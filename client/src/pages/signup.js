import "./signin.css";

import React, { useState, useEffect } from "react";
import {auth} from "../firebase";
import Password from "../components/password";

import Alert from "../components/alert";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  const [msg, setMsg] = useState({});

  const validation = (p, c) => {
    if (p.length > 6 && p === c) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setTimeout(() => setMsg({}), 10000);
  }, [msg]);

  const signup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;
    if (validation(password, cpassword)) {

      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        const idToken = await user.getIdToken();
        // configuration for req;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        };
        //  send req.
        fetch("/session/signup", requestOptions)
          .then((response) => response.json())
          .then((_) => {
            //  redirect to next component after 307
            history.push("./profile");
          })
          await user.sendEmailVerification();
      }

      catch (err) {
        setMsg({ msg: err.message, color: "#c10000", bgColor: "#f1a1a1" })
      }

      
    }
    //  validation failed
    else {
      setMsg({
        msg: "Please Check Your Passwords",
        color: "#c10000",
        bgColor: "#f1a1a1",
      });
    }
  };

  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form onSubmit={signup} method="POST">
          <h1>Sign Up</h1>
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
