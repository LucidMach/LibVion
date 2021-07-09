import "./signin.css";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="card">
        <form>
          <h1>Sign Up</h1>
          <input
            type="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
          />
          <input type="password" placeholder="Enter Your Password" />
          <input type="password" placeholder="Confirm Your Password" />
          <br />
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
