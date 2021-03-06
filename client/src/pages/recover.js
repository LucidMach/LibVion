import "./css/signin.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

import Alert from "../components/alert";
import Spinner from "../components/spinner";

const SignIn = () => {
  const [msg, setMsg] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var t = setTimeout(() => setMsg({}), 3000);
    return () => {
      clearTimeout(t);
    };
  }, [msg]);

  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const sendRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({
      msg: "Check Your Email ID",
      color: "#F1C100bb",
      bgColor: "#f1c100",
    });
    await auth.sendPasswordResetEmail(e.target.email.value);
  };

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form onSubmit={sendRecovery}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            name="email"
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
      {loading && <Spinner></Spinner>}
      {msg && <Alert msg={msg.msg} color={msg.color} bgColor={msg.bgColor} />}
    </div>
  );
};

export default SignIn;
