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

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
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
        role: userData.role
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!","Successfully created an account!","success",{
          button:false,
          timer:2000
        });
        //sets field to blank after form submission
        setUserData({ firstName: "", lastName: "", email: "", password: "" });
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        swal("Failed!","Failed to create an account!","error",{
          button:false,
          timer:2000
        });
      });
  };

  return (
    //SignUp page
      <div className={SignUpCSS.body}>
        <Navbar />
        <div className={SignUpCSS.WrapperSignup}>
          <div className={SignUpCSS.Card}>
            <h3 className={SignUpCSS.Title}> Create your account today! </h3>
            <form onSubmit={submitSignup} className={SignUpCSS.form}>
                <label className={SignUpCSS.PlaceholderSignup}>
                  First Name
                  <br></br>
                  <input required
                    aria-label="firstname"
                    className={SignUpCSS.Input}
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

                <label className={SignUpCSS.PlaceholderSignup}>
                  Last Name
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
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

                <label className={SignUpCSS.PlaceholderSignup}>
                  Email
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
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
                <label className={SignUpCSS.PlaceholderSignup}>
                  Password
                  <br></br>
                  <input required
                    className={SignUpCSS.Input}
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
                <label className={SignUpCSS.PlaceholderSignup}>Account Type
                </label>
                <br />
                <Select required className={SignUpCSS.selecter} id="select" value={userData.role} 
                sx={{width: 250, height: 40, backgroundColor: "white",borderColor: "black"}}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }>
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                  <MenuItem value={"Administrator"}>Administrator</MenuItem>
                </Select>
                <br />
                <br />
              <button className={SignUpCSS.SignupButton}>Sign Up</button>
            </form>
          </div>
          <div className={SignUpCSS.WelcomeText}>
          <h1>
            <p>
              {" "}
              Sign up today to connect with your boss, your colleagues, and
              your friends!{" "}
            </p>
          </h1>
            <p className={SignUpCSS.paragraph}>
              {" "}
              We are the leading platform for networking and sharing your
              professional activities.
              Our mission is to help you to become more productive in your
              life.
              Social networking has never been easier with the help of our
              dedicated team of developers.
              Join us today and you won't regret it. We are like LinkedIn,
              but better!{" "}
            </p>
          <div className={SignUpCSS.LinkSignup}>
            {" "}
            <strong>
              Already have an account ?{" "}
              <Link to={`/signin`}> Log In</Link>
            </strong>
          </div>
        </div>
        </div>
        <LoginFooter />
      </div>
  );
}

export default SignUp;
