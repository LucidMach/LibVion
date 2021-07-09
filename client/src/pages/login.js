import "./signin.css";
import { auth } from "../app"; 
import React from "react";

import { Link } from "react-router-dom";

const SignIn = () => {

  const login = async e => {
    e.preventDefault();
    let email =  e.target.email.value;
    let password = e.target.password.value;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const idToken = await user.getIdToken();
      // configuration for req;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken })
      };
      //  send req to backend for session
      fetch("/session/login", requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            alert("you're logged in!")
            // console.log("username: ", auth.currentUser.displayName)
          }
        });
    }
    catch (err)  {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="card">
        <form onSubmit={login}>
          <h1>Log In</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
            required
          />
          <input type="password" name="password" placeholder="Enter Your Password" required />
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
    </>
  );
};

export default SignIn;
