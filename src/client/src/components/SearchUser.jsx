import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/searchuserlist.css";
import { Context } from "../UserSession";

import swal from "sweetalert";

const SearchUser = () => {
  //States
  const [search, setSearch] = useState([]);

  //Get the search string from the user input
  let locationURL = useLocation().search;

  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  //Having the loginState persist on all pages
  useEffect(() => {
    if (userID) {
      navbarPersit();
      fetchSession();
    }
  }, []);

  //Having the loginState persist on all pages
  const navbarPersit = async () => {
    try {
      if (userID) {
        setLogin({
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSession = async () => {
    try {
      const response = await axios.get(`session`);
      setLogin({
        isLoggedIn: true,
      });
      sessionStorage.setItem("userID", response.data.user_info.user_id);
      sessionStorage.setItem("firstname", response.data.user_info.firstname);
      sessionStorage.setItem("lastname", response.data.user_info.lastname);
      sessionStorage.setItem("role", response.data.user_info.role);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //HTTP request to backend to fetch searched users
  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await axios.get(
          `/search${locationURL}`
        );
        setSearch(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    searchUser();
  }, [locationURL]);

  const Clickme = async (userid) => {
    console.log(userid);
    console.log(sessionStorage.getItem("userID"));
    console.log(sessionStorage.getItem("firstname"));
    console.log(sessionStorage.getItem("lastname"));
    axios
      .post(`/users/searchuserlist${locationURL}`, {
        _id: userid,
        userID: sessionStorage.getItem("userID"),
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
      })
      .then((response) => {
        swal(
          "Congrats!",
          "You have successfully sent connection request!",
          "success",
          {
            button: false,
            timer: 1000,
          }
        );
      })
      .catch((error) => {
        console.log(error);
        //alert("Cannot connect");
      });
  };
  return (
    // Display searched users
    <div>
      {userID && search ? (
        <div className="userContainer">
          {search.map((user) =>
            user._id === userID ? null : (
              <div className="singleUser">
                <Link to={`${user._id}`}>
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="default pic"
                  ></img>
                </Link>
                <div className="userInfo">
                  {user.firstname} {user.lastname}
                </div>
                <br></br>
                <div className="buttonSection">
                  <button
                    className="searchConnectButton"
                    onClick={() => Clickme(`${user._id}`)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default SearchUser;
