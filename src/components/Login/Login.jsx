import React, { useState } from "react";
import "./Login.css";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleAuthHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleUser = result.user;
        setUser(googleUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const githubAuthHandler = () => {
    signInWithPopup(auth , githubProvider)
      .then((result) => {
        const githubUser = result.user;
        console.log(githubUser)
        setUser(githubUser)
      })
  }

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
        <button className="btn" onClick={authSignOut}>
          Log Out
        </button>
      ) : (
        <>
          <button className="btn" onClick={googleAuthHandler}>
            Google Log In
          </button>
          <button className="btn" onClick={githubAuthHandler}>
            Github Log In
          </button>
        </>
      )}
      {user && (
        <div className="user">
          <h2>{user.displayName}</h2>
          <h2>{user.email}</h2>
          <img src={user.photoURL} />
        </div>
      )}
    </div>
  );
};

export default Login;
