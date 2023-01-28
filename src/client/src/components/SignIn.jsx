import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //State for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //HTTP Request to autenticate user
  const submitLogin = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/users/signin", {
        email: user,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Welcome Back");
        navigate("/UserProfile");
      })
      .catch((error) => {
        console.log(error);
        alert("Error loggin in");
      });
  };

  return (
    //Signin page
    <div className="Wrapper">
      <div className="Form">
        <h3 className="Title">Log in to your account </h3>
        <form>
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
            <div className="Link">
              Dont Have an account ? <Link to={`/signup`}> Sign Up</Link>
            </div>
          </div>
          <br></br>
          <br></br>
          <button className="LoginButton" onClick={submitLogin}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
