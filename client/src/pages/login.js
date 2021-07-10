import "./signin.css";
import React from "react";

import Password from "../components/password";

import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="card">
        <form>
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
          />
          <Password placeholder="Enter Your Password"></Password>
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
