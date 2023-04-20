import React, { useState, useEffect, useContext } from "react";
import "../css/UserProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../UserSession";
import Avatar from "@mui/material/Avatar";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
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

  //Make the request only on the first render
  useEffect(() => {
    if (userID) {
      fetchProfile();
      fetchUserConnections();
    }
  }, []);

  //HTTP Request in Backend to fetch user info
  const fetchProfile = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `https://connectin-api.onrender.com/users/profile/${userID}`
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  //http request to fetch connection
  const fetchUserConnections = async () => {
    try {
      if (userID) {
        const response = await axios.get(
          `https://connectin-api.onrender.com/users/profile/${userID}`
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
        axios
          .delete(
            `https://connectin-api.onrender.com/users/removeConnection/${userID}/connections/${connectionUserID}`
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

  return (
    <div>
      {userID && publicUser ? (
        <div className="userProfileContainer">
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
                    <Link to={`/EditUserProfile`}>
                      <button className="editButton">
                        {t("Edit Profile Page")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="userInformation">
              <span className="subTitle">Bio</span>
              <p className="userBio">
                {publicUser.bio
                  ? publicUser.bio
                  : t("You have not added any biography")}
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
                        alt="companyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span>{workExperience}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="userBio">
                    {t("You have not added any work experience")}
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
                    {t("You have not added any education")}
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
                    {t("You have not added any skills")}
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
                    {t("You have not added any languages")}
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
                    {t("You have not added any volunteering")}
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
                        <IconButton
                          onClick={() =>
                            removeConnection(
                              `${contact.userID}`,
                              `${contact.firstname}`,
                              `${contact.lastname}`
                            )
                          }
                        >
                          <HighlightOffIcon></HighlightOffIcon>
                        </IconButton>
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

export default UserProfile;
