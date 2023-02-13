import React, { useState, useEffect } from "react";
import "../css/signup.css";
import PageSetUp from "./PageSetUp";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitSignup = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/users", {
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
      .then((response) => {
        console.log(response.data);
        alert("Welcome to ConnectIn");
        navigate("/UserProfile");
      })
      .catch((error) => {
        console.log(error);
        alert("Error loggin in");
      });
    //sets field to blank after form submission
    setUserData({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    //SignUp page
    <Container>
      <div className="OverallSignupPage">
        <Row>
          <Col md={6}>
            <div className="WrapperSignup">
              <div className="FormSignup">
                <h3 className="Title"> Create your account today! </h3>
                <form onSubmit={submitSignup}>
                  <div className="FormSignup">
                    <label className="PlaceholderSignup">
                      First Name
                      <br></br>
                      <input
                        aria-label="firstname"
                        className="Input"
                        placeholder="Enter Your First Name"
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
                      Last Name
                      <br></br>
                      <input
                        className="Input"
                        placeholder="Enter Your Last Name"
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
                      Email
                      <br></br>
                      <input
                        className="Input"
                        placeholder="Enter Your Email"
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
                      Password
                      <br></br>
                      <input
                        className="Input"
                        placeholder="Enter your password"
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
                    <div className="LinkSignup">
                      {" "}
                      <strong>
                        Already have an account ?{" "}
                        <Link to={`/signin`}> Log In</Link>
                      </strong>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <button className="SignupButton">Sign Up</button>
                  <br></br>
                  <br></br>
                </form>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="WelcomeText">
              <h1>
                <p>
                  {" "}
                  Sign up today to connect with your boss, your colleagues, and
                  your friends!{" "}
                </p>
              </h1>
              <h3>
                <p>
                  {" "}
                  We are the leading platform for networking and sharing your
                  professional activities.
                  <br></br>
                  Our mission is to help you to become more productive in your
                  life.
                  <br></br>
                  Social networking has never been easier with the help of our
                  dedicated team of developers.
                  <br></br>
                  Join us today and you won't regret it. We are like LinkedIn,
                  but better!{" "}
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
