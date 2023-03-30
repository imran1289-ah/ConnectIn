import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/searchuserlist.css";
import { Context } from "../UserSession";

import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const SearchUser = () => {
  //States
  const [search, setSearch] = useState([]);

  //Get the search string from the user input
  let locationURL = useLocation().search;

  //Global loginState
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

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
          `http://localhost:9000/search${locationURL}`
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
      .post(`http://localhost:9000/users/searchuserlist${locationURL}`, {
        _id: userid,
        userID: sessionStorage.getItem("userID"),
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
      })
      .then((response) => {
        swal(
          t("Congrats!"),
          t("You have successfully sent connection request!"),
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

  const Friends = async (friendUserid, fname, lname) => {
    // console.log(ownUserId)
    // console.log(friendUserid)

    axios
      .post(`http://localhost:9000/users/searchfriendslist`, {
          ownUserID: sessionStorage.getItem("userID"),
          friendUserid: friendUserid,
          firstname:fname,
          lastname:lname,
      }).then((response) => {
        var friend = response.data;
        console.log(response.data);
        return friend;
      })
      .catch((error) => {
        console.log(error);
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
                  {console.log(Friends(`${user._id}`,`${user.firstname}`, `${user.lastname}`))}
                {Friends(`${user._id}`,`${user.firstname}`, `${user.lastname}`)===false ? 
                
                  (<button
                      className="searchConnectButton"
                    >
                      Already connected
                    </button>) :
                  (<button
                      className="searchConnectButton"
                      onClick={() => Clickme(`${user._id}`)}
                    >
                      Connect
                    </button>)}
                  </div>
              </div>
            )
          )}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          {t("Please login to your account")}
        </h1>
      )}
    </div>
  );
};

export default SearchUser;
