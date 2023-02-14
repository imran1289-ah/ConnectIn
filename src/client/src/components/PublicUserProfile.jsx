import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/publicuserprofile.css";

const PublicUserProfile = () => {
  //States
  const [publicUser, setPublicUser] = useState([]);

  //Get the search string from the user input
  let locationURL = useLocation().pathname;
  let profileId = useLocation().pathname.split("/")[3];

  //HTTP request to backend to fetch user info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/users/profile/${profileId}`
        );
        setPublicUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [locationURL]);

  return (
    <div className="userProfileContainer">
      {/* User Information Component */}
      <div className="left">
        <div className="userInformation">
          <div className="userContainer">
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
              <p>Software Engineering Student At Concordia University MTL/QC</p>
              <div className="connectButtonSection">
                <button className="connectButton">Connect</button>
              </div>
            </div>
          </div>
        </div>
        <div className="userInformation">
          <span className="subTitle">Bio</span>
          <p className="userBio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
        <div className="userJobInformation">
          <span className="subTitle">Experience</span>
          <ul className="elementList">
            <l1 className="jobInfo">
              <img
                src="https://play-lh.googleusercontent.com/5pZMqQYClc5McEjaISPkvhF8pDmlbLqraTMwk1eeqTlnUSjVxPCq-MItIrJPJGe7xW4"
                alt="comapnyPic"
                className="companyPic"
              ></img>
              <div>
                <span>Software Engineer</span>
                <br></br>
                <span>Facebook</span>
                <br></br>
                <span>2007-2019</span>
              </div>
            </l1>
          </ul>
        </div>
        <div className="userJobInformation">
          <span className="subTitle">Education</span>
          <ul className="elementList">
            <l1 className="jobInfo">
              <img
                src="https://concordiabootcamps.ca/wp-content/uploads/2019/03/icon.png"
                alt="comapnyPic"
                className="companyPic"
              ></img>
              <div>
                <span>Software Engineering COOP</span>
                <br></br>
                <span>Concordia University</span>
                <br></br>
                <span>2020-2024</span>
              </div>
            </l1>
          </ul>
        </div>
        <div className="userKnowledgeInformation">
          <span className="subTitle">Skills</span>
          <ul className="elementList">
            <l1 className="jobInfo">
              <p className="element">C++</p>
            </l1>
          </ul>
        </div>
        <div className="userKnowledgeInformation">
          <span className="subTitle">Languages</span>
          <ul className="elementList">
            <l1 className="jobInfo">
              <p className="element">English</p>
            </l1>
          </ul>
        </div>
        <div className="userKnowledgeInformation">
          <span className="subTitle">Volunteering</span>
          <ul className="elementList">
            <l1 className="jobInfo">
              <p className="element">Tutor 2nd grade student</p>
            </l1>
          </ul>
        </div>
      </div>
      {/* User Connections  */}
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
  );
};

export default PublicUserProfile;
