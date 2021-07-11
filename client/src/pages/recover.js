import "./signin.css";
import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
          />
          <Link to="/login" style={{ textAlign: "right" }}>
            cancel
          </Link>
          <br />
          <button>Send Email</button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
