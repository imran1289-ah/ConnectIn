import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/searchuserlist.css";
import { Context } from "../UserSession";

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
      fetchSession();
    }
  }, []);

  //Having the loginState persist on all pages
  const fetchSession = async () => {
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
    axios
      .post(`http://localhost:9000/users/searchuserlist${locationURL}`, {
        _id: userid,
      })
      .then((response) => {
        console.log(response.data);
        alert("Succesfully added user " + userid + " in awaiting connections!");
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
          {search.map((user) => (
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
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default SearchUser;
