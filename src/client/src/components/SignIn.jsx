import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInCSS from "../css/signin.module.css";
import LoginFooter from "../components/LoginFooter";
import Navbar from "../components/Navbar";
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
      .post("users/signin", {
        email: user,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.userSession.isBan){
          MessageRef.current.style.color = "red";
          MessageRef.current.innerHTML = t("You are banned from ConnectIn");
          axios.post("session/logout").then((response) => {
          });
          return;
        }
        sessionStorage.setItem("userID", response.data.userSession.user_id);
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
    <div className={SignInCSS.body}>
      <Navbar />
      <div className={SignInCSS.Wrapper}>
        <div className={SignInCSS.Card}>
          <p className={SignInCSS.LoginMessage} ref={MessageRef}>
          ConnectIn
          <br />
          {t("Log in to your account")}{" "}
        </p>
        <form>
          <div className={SignInCSS.Form}>
            <div className={SignInCSS.formLabel}>
              {t("Email")}
            </div>
            <input
              className={SignInCSS.LoginInput}
              placeholder="Enter your email"
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <div className={SignInCSS.formLabel}>
              {t("password")}
            </div>
            <input
              className={SignInCSS.LoginInput}
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <div className={SignInCSS.Link}>
              {t("donthave")} <Link to={`/signup`}>{t("Sign Up")}</Link>
            </div>
          </div>
          <br></br>
          <button className={SignInCSS.LoginButton} onClick={submitLogin}>
            {t("logIn")}
          </button>
        </form>
      </div>
    </div>
    <LoginFooter />
    </div>
  );
};

export default SignIn;
