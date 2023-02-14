import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/searchuserlist.css";

const SearchUser = () => {
  //States
  const [search, setSearch] = useState([]);

  //Get the search string from the user input
  let locationURL = useLocation().search;

  //HTTP request to backend to fetch searched users
  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/users/search${locationURL}`
        );
        setSearch(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    searchUser();
  }, [locationURL]);

  return (
    // Display searched users
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
            <button className="searchConnectButton">Connect</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchUser;
