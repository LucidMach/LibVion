import "./signin.css";
import Password from "../components/password";
import { UserContext } from "../contexts/userContext";
import Alert from "../components/alert";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const SignIn = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  const [msg, setMsg] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    setTimeout(() => setMsg({}), 7000);
  }, [msg]);

  const signup = (e) => {
    e.preventDefault();
    if (password.length > 6 && password === cpassword) {
      console.log({ password, cpassword, email });
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setUser(user.user);
          setMsg({ msg: "Success", color: "#00f100", bgColor: "#a1f1a1" });
        })
        .catch((err) => {
          setMsg({ msg: err.message, color: "#c10000", bgColor: "#f1a1a1" });
        });
    } else {
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
      {msg && <Alert msg={msg.msg} color={msg.color} bgColor={msg.bgColor} />}
    </div>
  );
};

export default SignIn;
