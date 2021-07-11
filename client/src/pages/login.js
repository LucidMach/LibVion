import "./signin.css";
import React from "react";

import { auth } from "../firebase"; 

import Alert from "../components/alert";
import Password from "../components/password";

import { Link } from "react-router-dom";

const SignIn = () => {
  const [msg, setMsg] = useState({});

  useEffect(() => {
    setTimeout(() => setMsg({}), 7000);
  }, [msg]);

  const bodyStyle = {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

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
          if (data.success) 
            setMsg({ msg: "Success", color: "#00f100", bgColor: "#a1f1a1" });
          else 
            setMsg({ msg: "failed", color: "#00f100", bgColor: "#a1f1a1" });
        });
    }
    catch (err)  {
      console.log(err)
      setMsg({ msg: err.message, color: "#c10000", bgColor: "#f1a1a1" });
    }
  }

  return (
    <div style={bodyStyle}>
      <div className="card">
        <form onSubmit={login} method="POST">
          <h1>Log In</h1>
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
      {msg && <Alert msg={msg.msg} color={msg.color} bgColor={msg.bgColor} />}
    </div>
  );
};

export default SignIn;
