import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserSession";
import axios from "axios";
import "../css/userTimeline.css";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const UserTimeline = () => {
  //Global state
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  const role = sessionStorage.getItem("role");

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //user connection state
  const [userConnections, setUserConnections] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    connections: [],
  });

  //http request to fetch user
  const fetchUserConnections = async () => {
    try {
      if (userID) {
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

  const [job, setJob] = useState();

  const fetchNotificationForRecentJob = async () => {
    try {
      if (userID) {
        const notificationInfo = await axios.get(
          `http://localhost:9000/users/notifications/${userID}`
        );

        setJob(notificationInfo.data.latestJob);
        console.log(job);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch session once
  useEffect(() => {
    fetchSession();
    fetchUserConnections();
    fetchConnections();
    //fetchConnectionPosts();
    fetchPosts();
    fetchNotificationForRecentJob();
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

  //Post state
  const [postData, setpostData] = useState({
    description: "",
    attachment: null,
    timestamp: new Date(),
  });

  //HTTP Request to fetch to add post
  const savePost = async () => {
    axios
      .post(`http://localhost:9000/users/post`, {
        _id: sessionStorage.getItem("userID"),
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
        description: postData.description,
        timestamp: postData.timestamp,
      })
      .then((response) => {
        console.log(response.data);
        swal(
          t("Congrats!"),
          t("You have successfully created a post!"),
          "success",
          {
            button: false,
            timer: 1000,
          }
        );
        navigate("/userTimeline");
      })
      .then((response) => {
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      })
      .catch((error) => {
        console.log(error);
        swal("Failed", "Your post was not created, try again!", "error", {
          button: false,
          timer: 1000,
        });
      });
  };

  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    await axios
      .get(`http://localhost:9000/users/${userID}/connections`)
      .then((response) => {
        setConnections(response.data);
      });
  };

  //http request to fetch posts
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    await axios
      .get(`http://localhost:9000/users/${userID}/posts`)
      .then((response) => {
        setPosts(response.data);
      });
  };

  //display post
  const userPosts = posts.map((post) => (
    <div className="userPostsTimeline">
      <span className="subTitleTimeline">
        {post.firstname} {post.lastname}
      </span>
      <p className="postText">{post.description}</p>
    </div>
  ));

  //sort posts based on timestamp
  //const allPosts = [...allConnectionsPosts, ...userPosts]
  const allSortedPosts = [...userPosts].sort((a, b) => {
    return a.timestamp > b.timestamp ? 1 : -1;
  });

  //http request to remove connection
  const removeConnection = async (
    connectionUserID,
    connectionFirstName,
    connectionLastName
  ) => {
    swal({
      title: `Are you sure you want to remove ${connectionFirstName} ${connectionLastName} from your connection ?`,
      text: "Once the user is deleted, the user will be removed from your connections",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log(userID, connectionUserID);
        axios
          .delete(
            `http://localhost:9000/rooms/deleteRoom/${userID}/${connectionUserID}`
          )
          .catch((err) => {
            console.log(err);
          });
        axios
          .delete(
            `http://localhost:9000/users/removeConnection/${userID}/connections/${connectionUserID}`
          )
          .then((response) => {
            swal(
              `${connectionFirstName} ${connectionLastName} has been removed`,
              {
                icon: "success",
              }
            );
            setTimeout(function () {
              window.location.reload();
            }, 1200);
          })

          .catch((error) => {
            console.log(error);
          });
      } else {
        swal(`${connectionFirstName} ${connectionLastName} was not removed`);
      }
    });
  };
  const notify = () => toast(t("New Job Alert Posted: ") + job.title);

  const redirectDMReports = () => {
    navigate("/dmReports");
  };

  const redirectManageAccounts = () => {
    navigate("/manageAccounts");
  };

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
            <span className="userNameTimeline">
              <IconButton onClick={notify}>
                <NotificationsNoneIcon></NotificationsNoneIcon>
                <ToastContainer />
                <span style={{fontSize:"18px"}}>Job Alert</span>
              </IconButton>
             
              {role == "Administrator" && (
                <>
                  <br></br>
                  <IconButton onClick={redirectManageAccounts}>
                    <ManageAccountsOutlinedIcon></ManageAccountsOutlinedIcon>
                    <ToastContainer />
                  </IconButton>
                  <IconButton onClick={redirectDMReports}>
                    <OutlinedFlagTwoToneIcon></OutlinedFlagTwoToneIcon>
                    <ToastContainer />
                  </IconButton>
                </>
              )}
            </span>
          </div>

          {/* User posts section*/}
          <div className="middleTimeline">
            {/* Create a post section*/}
            <br></br>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              {t("Welcome to your timeline")}{" "}
            </div>
            <div className="userInformationTimeline">
              <TextField
                id="outlined-basic"
                label={t("Start A Post")}
                variant="standard"
                className="postTextField"
                value={postData.description}
                onChange={(e) =>
                  setpostData({ ...postData, description: e.target.value })
                }
                style={{ marginLeft: "10px" }}
              />
              <IconButton style={{ marginTop: "10px" }}>
                <SendIcon onClick={savePost} fontSize="small"></SendIcon>
              </IconButton>
              <div
                className="timestamp"
                value={Date.now()}
                onChange={(e) =>
                  setpostData({ ...postData, timestamp: e.target.value })
                }
              />

              {/* <input className="imageFile" type="file" accept=".png" name="image" 
              onChange={e => setpostData({...postData, attachment: e.target.files[0]})}/> */}
            </div>
            {/* user's post in their timeline*/}
            <div>
              {/* each div is a single post*/}

              {allSortedPosts}
            </div>
          </div>
          <div className="right">
            <span className="subTitle">Contacts</span>
            <br></br>
            <div>
              {userConnections && userConnections.connections.length > 0 ? (
                userConnections.connections.map((connection) => {
                  return (
                    <l1 className="connectionsInfo">
                      <img
                        src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span className="connectionName">
                          <Link
                            to={`/users/search/${connection.userID}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {connection.firstname} {connection.lastname}
                          </Link>
                          <IconButton
                            onClick={() =>
                              removeConnection(
                                `${connection.userID}`,
                                `${connection.firstname}`,
                                `${connection.lastname}`
                              )
                            }
                          >
                            <HighlightOffIcon></HighlightOffIcon>
                          </IconButton>
                        </span>
                      </div>
                    </l1>
                  );
                })
              ) : (
                <p className="userBio">{t("You do not have any connection")}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          {t("Please login to your account")}
        </h1>
      )}
    </div>
  );
};

export default UserTimeline;
