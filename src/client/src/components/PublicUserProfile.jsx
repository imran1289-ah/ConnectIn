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

  //HTTP request to backend
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
              <p>
                Software Engineering Student At Concordia University In Montreal
                Quebec
              </p>
              <button>Connect</button>
            </div>
          </div>
        </div>
        <div className="userInformation">
          Experience
          <br></br>
          <ul>
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
        <div className="userInformation">
          Education
          <ul>
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
      </div>
      <div className="right">Contacts</div>
    </div>
  );
};

export default PublicUserProfile;
