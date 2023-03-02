import React, { useContext, useEffect } from "react";
import { Context } from "../UserSession";
import axios from "axios";
import "../css/userTimeline.css";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";

const UserTimeline = () => {
  //Global state
  const [login, setLogin] = useContext(Context);

  //fetch session once
  useEffect(() => {
    fetchSession();
  }, []);

  //Fetch session information
  const fetchSession = async () => {
    try {
      const response = await axios.get(`session`);
      setLogin({
        isLoggedIn: true,
      });
      sessionStorage.setItem("userID", response.data.user_info.user_id);
      sessionStorage.setItem("firstname", response.data.user_info.firstname);
      sessionStorage.setItem("lastname", response.data.user_info.lastname);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  //HTTP Request to fetch posts and add posts ....

  return (
    <div>
      {userID && login ? (
        <div className="userTimelineContainer">
          {/* User Information Component */}
          <div className="leftTimeline">
            <div className="userContainerTimeline">
              <img
                src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                alt="default pic"
                style={{
                  height: 90,
                  width: 90,
                  display: "block",
                  margin: "auto",
                }}
              ></img>
            </div>
            <span className="userNameTimeline">
              {sessionStorage.getItem("firstname")}{" "}
              {sessionStorage.getItem("lastname")}
            </span>
            <br></br>
            <span className="connectionsLinkTimeline">View Conenctions</span>
          </div>

          {/* User posts section*/}
          <div className="middleTimeline">
            {/* Create a post section*/}
            <div className="userInformationTimeline">
              <IconButton>
                <EditIcon fontSize="medium"></EditIcon>
              </IconButton>
              <TextField
                id="outlined-basic"
                label="Start A Post"
                variant="standard"
                className="postTextField"
              />
            </div>
            {/* user's post in their timeline*/}
            <div>
              {/* each div is a single post*/}
              <div className="userPostsTimeline">
                <span className="subTitleTimeline">John Doe</span>
                <p className="postText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>

              <div className="userPostsTimeline">
                <span className="subTitleTimeline">John Doe</span>
                <p className="postText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="userPostsTimeline">
                <span className="subTitleTimeline">John Doe</span>
                <p className="postText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div className="userPostsTimeline">
                <span className="subTitleTimeline">John Doe</span>
                <p className="postText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="userPostsTimeline">
                <span className="subTitleTimeline">John Doe</span>
                <p className="postText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
          {/* User Connections section  */}
          <div className="right">
            <span className="subTitle">Contacts</span>
            <br></br>
            <div>
              <ul>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default UserTimeline;
