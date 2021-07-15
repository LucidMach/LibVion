import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const Profile = () => {
  const [emailVerified, setEmailVerified] = useState("loading");
  const [email, setEmail] = useState("loading");

  useEffect(() => {
    setEmail(auth.currentUser.email);
    setEmailVerified(auth.currentUser.emailVerified ? "yes" : "no");
  }, []);

  const updateProfile = (e) => {
    e.preventDefault();
    console.log(e.target.flat.value);
    fetch("/user/me/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        flatNo: e.target.flat.value,
        displayName: e.target.name.value,
      }),
    });
  };

  return (
    <div className="card">
      <form onSubmit={updateProfile} method="POST">
        <h1>Your Profile</h1>
        <br />
        name:
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          defaultValue={auth.currentUser.displayName}
          autoComplete="none"
        />
        email-id:
        <input type="text" value={email} disabled />
        email verification:
        <input type="text" placeholder={emailVerified} disabled />
        flat number:
        <input
          type="number"
          defaultValue={auth.currentUser.flatNo}
          name="flat"
          placeholder="Enter Flat No"
          autoComplete="none"
        />
        <button>SAVE</button>
      </form>
    </div>
  );
};

export default Profile;
