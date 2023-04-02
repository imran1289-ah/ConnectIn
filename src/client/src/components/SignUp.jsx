import React, { useState, useEffect } from "react";
import "../css/signup.css";
import PageSetUp from "./PageSetUp";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        swal("Success!", t("Successfully created an account!"), "success", {
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
    <Container>
      <div className="OverallSignupPage">
        <Row>
          <Col md={6}>
            <div className="WrapperSignup">
              <div className="FormSignup">
                <h3 className="Title"> {t("Create your account today!")} </h3>
                <form onSubmit={submitSignup}>
                  <div className="FormSignup">
                    <label className="PlaceholderSignup">
                      {t("First Name")}
                      <br></br>
                      <input
                        required
                        aria-label="firstname"
                        className="Input"
                        placeholder={t("Enter Your First Name")}
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

                    <label className="PlaceholderSignup">
                      {t("Last Name")}
                      <br></br>
                      <input
                        required
                        className="Input"
                        placeholder={t("Enter Your Last Name")}
                        name="lastname"
                        value={userData.lastName}
                        onChange={(e) =>
                          setUserData({ ...userData, lastName: e.target.value })
                        }
                      ></input>
                    </label>
                    <br></br>
                    <br></br>

                    <label className="PlaceholderSignup">
                      {t("Email")}
                      <br></br>
                      <input
                        required
                        className="Input"
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
                    <label className="PlaceholderSignup">
                      {t("password")}
                      <br></br>
                      <input
                        required
                        className="Input"
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
                    <label className="PlaceholderSignup">
                      {t("Account Type")}
                      <br />
                      <Select
                        required
                        id="select"
                        value={userData.role}
                        sx={{
                          width: 250,
                          height: 40,
                          backgroundColor: "#a3c5d0",
                          borderColor: "white",
                        }}
                        onChange={(e) =>
                          setUserData({ ...userData, role: e.target.value })
                        }
                      >
                        <MenuItem value={"User"}>{t("User")}</MenuItem>
                        <MenuItem value={"Recruiter"}>
                          {t("Recruiter")}
                        </MenuItem>
                        <MenuItem value={"Administrator"}>
                          {t("Administrator")}
                        </MenuItem>
                      </Select>
                    </label>
                    <br />
                    <br />
                    <div className="LinkSignup">
                      {" "}
                      <strong>
                        {t("Already have an account ?")}{" "}
                        <Link to={`/signin`}>{t("logIn")}</Link>
                      </strong>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <button className="SignupButton">{t("Sign Up")}</button>
                  <br></br>
                  <br></br>
                </form>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="WelcomeText">
              <h1>
                <p> {t("signuptext1")} </p>
              </h1>
              <h3>
                <p>
                  {" "}
                  {t("signuptext2")}
                  <br></br>
                  {t("signuptext3")}
                  <br></br>
                  {t("signuptext4")}
                  <br></br>
                  {t("signuptext5")}{" "}
                </p>
              </h3>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SignUp;
