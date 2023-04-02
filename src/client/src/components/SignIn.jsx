import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";
import axios from "axios";
import { Context } from "../UserSession";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  //State for each input
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const MessageRef = useRef(null);
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();


  //HTTP Request to autenticate user
  const submitLogin = async (e) => {
    e.preventDefault();
    axios
      .post("https://connectin-api.onrender.com/users/signin", {
        email: user,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("userID", response.data.userSession.user_id);
        sessionStorage.setItem("firstname", response.data.userSession.firstname);
        sessionStorage.setItem("lastname", response.data.userSession.lastname);
        sessionStorage.setItem("role", response.data.userSession.role);
        MessageRef.current.style.color = "#66FF00";
        MessageRef.current.innerHTML = t("Login Sucess. Welcome Back");
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
        MessageRef.current.innerHTML = t(
          "Incorrect Credentials Please try again"
        );
      });
  };

  return (
    //Signin page
    <div className="Wrapper">
      <div className="Form">
        <p className="LoginMessage" ref={MessageRef}>
          {t("Log in to your account")}{" "}
        </p>
        <form>
          <div className="Form">
            <label className="Placeholder">
              {t("Email")}
              <br></br>
              <input
                className="LoginInput"
                placeholder={t("enteremail")}
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </label>
            <br></br>
            <br></br>
            <label className="Placeholder">
              {t("password")}
              <br></br>
              <input
                className="LoginInput"
                placeholder={t("enterpassword")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <br></br>
            <br></br>
            <div className="Link">
              {t("donthave")} <Link to={`/signup`}> {t("Sign Up")}</Link>
            </div>
          </div>
          <br></br>
          <br></br>
          <button className="LoginButton" onClick={submitLogin}>
            {t("logIn")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
