import React, { useState } from "react";
import "./Login.css";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const authHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const authSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
      })
      .catch((error) => console.log("error", error.message));
  };

  return (
    <div className="login">
      {user ? (
        <button className="google-btn" onClick={authSignOut}>
          Log Out
        </button>
      ) : (
        <button className="google-btn" onClick={authHandler}>
          Google Log In
        </button>
      )}
      {user && (
        <div className="user">
          <h2>{user.displayName}</h2>
          <h2>{user.email}</h2>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
