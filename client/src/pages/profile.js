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
  };

  return (
    <div className="card">
      <form onSubmit={updateProfile} method="POST">
        <h1>Your Profile</h1>
        <br />
        email-id:
        <input type="text" placeholder={email} disabled />
        email verification:
        <input type="text" placeholder={emailVerified} disabled />
        flat number:
        <input type="number" name="flat" autoComplete="none" />
        <button>SAVE</button>
      </form>
    </div>
  );
};

export default Profile;
