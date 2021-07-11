import React, { useEffect, useState } from "react";

const Profile = () => {
  const [emailVerified, setEmailVerified] = useState("loading");
  const [email, setEmail] = useState('loading')

  useEffect(() => {
    fetch('/user/me')
      .then(res => res.json())
      .then(data => {
        console.log("profile: ", data);
        setEmail(data.data.email);
        data.data.emailVerified ?
        setEmailVerified("yes") :
        setEmailVerified("no")
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={coverStyle}>
      <h1 style={textStyle}>{email}</h1>
      <h2 style={textStyle}>Verified: {emailVerified}</h2>
    </div>
  );
};

export default Profile;


// styles

const coverStyle = {
  display: "grid",
  placeContent: "center",
  height: "50%",
  width: "80%",
  margin: "2em auto",
  backgroundColor: "gray"
}

const textStyle = {
  width: "max-content",
  textAlign: "center",
  margin: "5px auto",
  padding: "10px 15px"
}
