import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";
import axios from "axios";
import { Context } from "../Store";

const SignIn = () => {
  //State for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const MessageRef = useRef(null);
  const [login, setLogin] = useContext(Context);

  //HTTP Request to autenticate user
  const submitLogin = async (e) => {
    e.preventDefault();
    axios
      .post("users/signin", {
        email: user,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        MessageRef.current.style.color = "#66FF00";
        MessageRef.current.innerHTML = "Login Sucess. Welcome Back";
        setLogin({
          isLoggedIn: true,
        });

        setTimeout(() => {
          navigate("/userTimeline");
        }, 10);
      })
      .catch((error) => {
        console.log(error);
        MessageRef.current.style.color = "red";
        MessageRef.current.innerHTML = "Incorrect Credentials Please try again";
      });
  };

  return (
    //Signin page
    <div className="Wrapper">
      <div className="Form">
        <p className="LoginMessage" ref={MessageRef}>
          Log in to your account{" "}
        </p>
        <form>
          <div className="Form">
            <label className="Placeholder">
              Email or Username
              <br></br>
              <input
                className="LoginInput"
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
                className="LoginInput"
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
