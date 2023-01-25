import React, { useState, useEffect } from "react";
import "../css/signin.css";

const SignIn = () => {
  //State for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  //HTTP Request to autenticate user
  const submitLogin = async (e) => {};

  return (
    //Signin page
    <div className="Wrapper">
      <div className="Form">
        <h3 className="Title">Log in to your account </h3>
        <form onSubmit={submitLogin}>
          <div className="Form">
            <label className="Placeholder">
              Email or Username
              <br></br>
              <input
                className="Input"
                placeholder="Enter your email or username"
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </label>
            <br></br>
            <br></br>
            <label className="Placeholder">
              Password
              <br></br>
              <input
                className="Input"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <br></br>
            <br></br>
            <div className="Link">Dont Have an account ? Sign Up</div>
          </div>
          <br></br>
          <br></br>
          <button className="LoginButton">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
