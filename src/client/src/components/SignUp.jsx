import React, { useState, useEffect } from "react";
import "../css/signup.css";
import SignUpCSS from "../css/signup.module.css";
import Navbar from "./Navbar";
import PageSetUp from "./PageSetUp";
import { Link, Navigate } from "react-router-dom";
import LoginFooter from './LoginFooter';
import swal from "sweetalert";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const submitSignup = async (e) => {
    e.preventDefault();
    axios
      .post("https://connectin-api.onrender.com/users", {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      })
      .then((response) => {
        console.log(response.data);
        swal(t("Success!"), t("Successfully created an account!"), "success", {
          button: false,
          timer: 2000,
        });
        //sets field to blank after form submission
        setUserData({ firstName: "", lastName: "", email: "", password: "" });
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        swal("Failed!", t("Failed to create an account!"), "error", {
          button: false,
          timer: 2000,
        });
      });
  };

  return (
    //SignUp page
      <div className={SignUpCSS.body}>
        <Navbar />
        <div className={SignUpCSS.WrapperSignup}>
          <div className={SignUpCSS.Card}>
            <h3 className={SignUpCSS.Title}> {t("Create your account today!")}  </h3>
            <form onSubmit={submitSignup} className={SignUpCSS.form}>
                <label className={SignUpCSS.PlaceholderSignup}>
                  {t("First Name")}
                  <br></br>
                  <input required
                    aria-label="firstname"
                    className={SignUpCSS.Input}
                    placeholder={t("Enter your first name")}
                    name="firstname"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        firstName: e.target.value,
                      })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>

                <label className={SignUpCSS.PlaceholderSignup}>
                  {t("Last Name")}
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
                    placeholder={t("Enter your last name")}
                    name="lastname"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>

                <label className={SignUpCSS.PlaceholderSignup}>
                   {t("Email")}
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
                    placeholder={t("enteremail")}
                    name="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>
                <label className={SignUpCSS.PlaceholderSignup}>
                  {t("password")}
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
                    placeholder={t("enterpassword")}
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>
                <label className={SignUpCSS.PlaceholderSignup}>{t("Account Type")}
                </label>
                <br />
                <Select required className={SignUpCSS.selecter} id="select" value={userData.role} 
                sx={{width: 250, height: 40, backgroundColor: "white",borderColor: "black"}}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }>
                  <MenuItem value={"User"}>{t("User")}</MenuItem>
                  <MenuItem value={"Recruiter"}>{t("Recruiter")}</MenuItem>
                </Select>
                <br />
                <br />
              <button className={SignUpCSS.SignupButton}>{t("Sign Up")}</button>
            </form>
          </div>
          <div className={SignUpCSS.WelcomeText}>
          <h1>
            <p>
              {" "}
              {t("signuptext1")}{" "}
            </p>
          </h1>
            <p className={SignUpCSS.paragraph}>
              {" "}
              {t("signuptext2")}
              {t("signuptext3")}
              {t("signuptext4")}
              {t("signuptext5")}{" "}
            </p>
          <div className={SignUpCSS.LinkSignup}>
            {" "}
            <strong>
              {t("Already have an account ?")}{" "}
              <Link to={`/signin`}>{t("logIn")}</Link>
            </strong>
          </div>
        </div>
        </div>
        <LoginFooter />
      </div>
  );
}

export default SignUp;
