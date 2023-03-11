import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserSession";
import axios from "axios";
import "../css/userTimeline.css";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const UserTimeline = () => {
  //Global state
  const [login, setLogin] = useContext(Context);
  const navigate = useNavigate();
  const [userConnections, setUserConnections] = useState(
    {
      _id: "",
      firstname: "",
      lastname: "",
      connections: [],
    }
  );
  const [postData, setpostData] = useState({
    description: "",
    attachment: null,
    timestamp: new Date()
  });

  const fetchUserConnections = async () => {
    try{
      if(userID){
        const response = await axios.get(
          `http://localhost:9000/users/profile/${userID}`
        );
        setUserConnections({
          _id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          connections: response.data.connections,
        });
      }
    } catch (error) {
      console.log(error);
   }
  };

  //fetch session once
  useEffect(() => {
    fetchSession();
    fetchUserConnections();
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
      sessionStorage.setItem("role", response.data.user_info.role);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = async () => {
    console.log(sessionStorage.getItem("userID"));
    console.log(sessionStorage.getItem("firstname"));
    console.log(sessionStorage.getItem("lastname"));
    axios
      .post(`http://localhost:9000/users/post`, {
        _id: sessionStorage.getItem("userID"), 
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"), 
        description: postData.description,
        timestamp: postData.timestamp
      })
      .then((response) => {
        console.log(response.data);
        swal("Congrats!", "You have successfully created a post!","success",{
          button:false,
          timer:1000
        });
        navigate("/userTimeline");
      })
      .catch((error) => {
        console.log(error);
        swal("Failed", "Your post was not created, try again!", "error",{
          button:false,
          timer:1000
        })
      });
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
            <span className="connectionsLinkTimeline">View Connections</span>
          </div>

          {/* User posts section*/}
          <div className="middleTimeline">
            {/* Create a post section*/}
            <div className="userInformationTimeline">
              <IconButton>
                <EditIcon onClick={savePost} fontSize="medium"></EditIcon>
              </IconButton>
              <TextField
                id="outlined-basic"
                label="Start A Post"
                variant="standard"
                className="postTextField"
                value= {postData.description}
                onChange={e => setpostData({ ...postData, description: e.target.value })}
              />
              <div className="timestamp" value={Date.now()} 
              onChange={e => setpostData({...postData, timestamp: e.target.value})} />
                
              {/* <input className="imageFile" type="file" accept=".png" name="image" 
              onChange={e => setpostData({...postData, attachment: e.target.files[0]})}/> */}
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
                {userConnections && (userConnections.connections.map((connection) => {
                  return (
                    <>
                    <l1 className="connectionsInfo">
                      <img
                      src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                      alt="comapnyPic"
                      className="companyPic"></img>
                      <div>
                        <span className="connectionName">{connection.firstname} {connection.lastname}</span>
                      </div>
                      </l1>
                    </>
                  );
                }))}
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
