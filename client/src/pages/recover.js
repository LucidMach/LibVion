import "./signin.css";
import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="card">
        <form>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Enter Your Email-ID"
            autoComplete="none"
          />
          <br />
          <button>Send Email</button>
          <br />
        </form>
      </div>
    </>
  );
};

export default SignIn;
