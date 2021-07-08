import "./signin.css";
import React from "react";

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
          <button>Sign Up</button>
        </form>
      </div>
      <p style={{ textAlign: "center" }}>
        Have An Account? <span>Log In</span>
      </p>
    </>
  );
};

export default SignIn;
