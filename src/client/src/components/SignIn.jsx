import React from "react";
import "../css/signin.css";

const SignIn = () => {
  return (
    //Signin page
    <div className="Wrapper">
      <div className="Form">
        <h3 className="Title">Log in to your account </h3>
        <form>
          <div className="Form">
            <span className="Placeholder">Email or Username</span>
            <br></br>
            <input
              className="Input"
              placeholder="Enter your email or username"
            ></input>
            <br></br>
            <br></br>
            <span className="Placeholder">Password</span>
            <br></br>
            <input className="Input" placeholder="Enter your password"></input>
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
