import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/publicuserprofile.css";
import { Context } from "../UserSession";

import swal from "sweetalert";
import { Link, Navigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PublicUserProfile = () => {
  //States
  const [publicUser, setPublicUser] = useState([
    {
      _id: "",
      firstname: "",
      lastname: "",
      volunteering: [],
      skills: [],
      workExp: [],
      bio: "",
      headLine: "",
      languages: [],
      education: [],
    },
  ]);

  const [userConnections, setUserConnections] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    connections: [],
  });

  //Get the search string from the user input
  let locationURL = useLocation().pathname;
  let profileId = useLocation().pathname.split("/")[3];

  //Global loginState
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

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

  //Make the request once and only when locationURL changes
  useEffect(() => {
    fetchProfile();
    fetchUserConnections();
  }, [locationURL]);

  const Clickme = async (userid) => {
    console.log(userid);
    axios
      .post(`https://connectin-api.onrender.com/users/searchuserlist`, {
        _id: userid,
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
        userID: sessionStorage.getItem("userID"),
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
  //HTTP Request in Backend to fetch user info
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://connectin-api.onrender.com/users/profile/${profileId}`
      );
      setPublicUser({
        _id: response.data._id,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        volunteering: response.data.volunteering,
        skills: response.data.skills,
        workExp: response.data.workExp,
        bio: response.data.bio,
        headLine: response.data.headLine,
        languages: response.data.languages,
        education: response.data.education,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //HTTP request to fetch user's connections
  const fetchUserConnections = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `https://connectin-api.onrender.com/users/profile/${profileId}`
        );

        setUserConnections({
          _id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          connections: response.data.connections,
        });
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Friends = async (friendUserid, fname, lname) => {
    // console.log(ownUserId)
    // console.log(friendUserid)
    return new Promise((resolve, reject) => {
      axios
        .post(`https://connectin-api.onrender.com/users/searchfriendslist`, {
          ownUserID: sessionStorage.getItem("userID"),
          friendUserid: friendUserid,
          firstname: fname,
          lastname: lname,
        })
        .then((response) => {
          var friend = response.data;
          //console.log(response.data);
          if (friend) {
            swal(t("Congrats!"), t("You are already connected"), "error", {
              button: false,
              timer: 1000,
            });
          } else {
            Clickme(`${friendUserid}`);
          }

          resolve(friend);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      {userID && publicUser && userID !== profileId ? (
        <div className="userProfileContainer">
          {/* User Information Component */}
          <div className="left">
            <div className="userInformation">
              <div className="userContainerProfile">
                <img
                  src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                  alt="default pic"
                  className="userProfilePic"
                ></img>
                <div className="userAboutSection">
                  <span className="userName">
                    {publicUser.firstname} {publicUser.lastname}
                  </span>
                  <br />
                  <p>{publicUser.headLine}</p>
                  <div className="connectButtonSection">
                    <button
                      className="connectButton"
                      onClick={() =>
                        Friends(
                          `${publicUser._id}`,
                          `${publicUser.firstname}`,
                          `${publicUser.lastname}`
                        )
                      }
                    >
                      {t("Connect")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="userInformation">
              <span className="subTitle">Bio</span>
              <p className="userBio">
                {publicUser.bio
                  ? publicUser.bio
                  : t("The user did not add a biogragphy")}
              </p>
              <br></br>
            </div>
            <div className="userJobInformation">
              <span className="subTitle">{t("Work Experience")}</span>
              <ul className="elementList">
                {publicUser.workExp && publicUser.workExp.length > 0 ? (
                  publicUser.workExp.map((workExperience) => (
                    <li key={workExperience} className="jobInfo">
                      <img
                        src="https://png.pngtree.com/png-vector/20210207/ourlarge/pngtree-yellow-brown-mens-briefcase-clip-art-png-image_2882849.png"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span>{workExperience}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {t("The user did not add any work experience")}
                  </p>
                )}
              </ul>
            </div>
            <div className="userJobInformation">
              <span className="subTitle">{t("Education")}</span>
              <ul className="elementList">
                {publicUser.education && publicUser.education.length > 0 ? (
                  publicUser.education.map((education) => (
                    <li key={education} className="jobInfo">
                      <img
                        src="https://img.freepik.com/premium-vector/square-academic-cap-clipart-high-school-college-graduation-concept_302536-253.jpg?w=2000"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span>{education}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {t("The user did not add any education")}
                  </p>
                )}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">{t("Skills")}</span>
              <ul className="elementList">
                {publicUser.skills && publicUser.skills.length > 0 ? (
                  publicUser.skills.map((skill) => (
                    <li key={skill} className="jobInfo">
                      <p className="element">{skill}</p>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {t("The user did not add any skills")}
                  </p>
                )}{" "}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">{t("Languages")}</span>
              <ul className="elementList">
                {publicUser.languages && publicUser.languages.length > 0 ? (
                  publicUser.languages.map((language) => (
                    <li key={language} className="jobInfo">
                      <p className="element">{language}</p>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {t("The user did not add any language")}
                  </p>
                )}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">{t("Volunteering")}</span>

              <ul className="elementList">
                {publicUser.volunteering &&
                publicUser.volunteering.length > 0 ? (
                  publicUser.volunteering.map((volunteeringExp) => (
                    <li key={volunteeringExp} className="jobInfo">
                      <p className="element">{volunteeringExp}</p>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {" "}
                    {t("The user did not add any volunterring experience")}
                  </p>
                )}{" "}
              </ul>
            </div>
          </div>
          {/* User Connections  */}
          <div className="right">
            <span className="subTitle">Contacts</span>
            <br></br>
            <div>
              {userConnections.connections &&
              userConnections.connections.length > 0 ? (
                userConnections.connections.map((contact) => {
                  return (
                    <l1 className="connectionsInfo">
                      <img
                        src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <Link
                          to={`/users/search/${contact.userID}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <span className="connectionName">
                            {contact.firstname} {contact.lastname}
                          </span>
                        </Link>
                      </div>
                    </l1>
                  );
                })
              ) : (
                <p className="userBio">
                  {t("The user does not have any connections")}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/userProfile"></Navigate>
      )}
    </div>
  );
};

export default PublicUserProfile;
