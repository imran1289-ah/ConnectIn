import React, { useContext, useState, useEffect } from "react";
import "../css/EditUserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../UserSession";
import { useTranslation } from "react-i18next";

const EditUserProfile = () => {
  const [languages, setLanguages] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workExp, setWorkExp] = useState([]);
  const [volunteering, setVolunteering] = useState([]);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const [userData, setUserData] = useState({
    email: "",
    bio: "",
    headLine: "",
    languages: "",
    education: [],
    skills: [],
    workExp: [],
    volunteering: [],
  });

  //Global loginState
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

  const [resumeExists, setResumeExists] = useState(false);
const [coverLetterExists, setCoverLetterExists] = useState(false);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

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

  const downloadResume = async () => {
    const response = await fetch(`https://connectin-api.onrender.com/resume/getResume/${userID}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${userID}-resume.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCoverLetter = async () => {
    const response = await fetch(`https://connectin-api.onrender.com/resume/getCoverLetter/${userID}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${userID}-coverLetter.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
  const fetchUserFiles = async () => {
    const resumeResponse = await fetch(`https://connectin-api.onrender.com/resume/getResume/${userID}`);
    const coverLetterResponse = await fetch(`https://connectin-api.onrender.com/resume/getCoverLetter/${userID}`);
    if (resumeResponse.status === 200) {
      setResumeExists(true);
    }
    if (coverLetterResponse.status === 200) {
      setCoverLetterExists(true);
    }
  };
  if (userID) {
    fetchSession();
    fetchUserFiles();
  }
}, []);


  const navigate = useNavigate();

  const submitEditProfile = async (e) => {
    e.preventDefault();

    const resumeData = new FormData();
    resumeData.append("resume", resume);

    const coverLetterData = new FormData();
    coverLetterData.append("coverLetter", coverLetter);
    if (userID) {
      axios
        .patch(`https://connectin-api.onrender.com/users/profile/${userID}`, {
          bio: userData.bio,
          headLine: userData.headLine,
          languages: userData.languages,
          email: userData.email,
          education: userData.education,
          skills: userData.skills,
          workExp: userData.workExp,
          volunteering: userData.volunteering,
        })
        .then((response) => {
          console.log(response.data);
          axios.post(`https://connectin-api.onrender.com/resume/uploadResume/${userID}`, resumeData)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
          axios.post(`https://connectin-api.onrender.com/resume/uploadCoverLetter/${userID}`, coverLetterData)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
          navigate("/UserProfile");
        })
        .catch((error) => {
          console.log(error);
          alert("Error editing user profile");
        });
    }
  };

  const languagesChange = () => {
    if (languages.length !== 0) {
      setUserData({ ...userData, languages: [...userData.languages, languages] });
      setLanguages("");
    }
  };

  const educationChange = () => {
    if (education.length !== 0) {
      setUserData({ ...userData, education: [...userData.education, education] });
      setEducation("");
    }
  };

  const skillsChange = () => {
    if (skills.length !== 0) {
      setUserData({ ...userData, skills: [...userData.skills, skills] });
      setSkills("");
    }

  };

  const workExpChange = () => {
    if (workExp.length !== 0) {
      setUserData({ ...userData, workExp: [...userData.workExp, workExp] });
      setWorkExp("");
    }
    
  };

  const volunteeringChange = () => {
    if (volunteering.length !== 0) {
      setUserData({...userData, volunteering: [...userData.volunteering, volunteering] });
      setVolunteering("");
    }
  };
  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.files[0]);
  };

  return (
    <div className="EditUserProfileContainer">
      {userID && userData ? (
        <form className="userProfileForm" onSubmit={submitEditProfile}>
          <h1 className="edit-profile-title">{t("Edit Profile Page")}</h1>
          <div className="EditUserForm-Container">
            <div className="edit-right-side">
              <label>
                {t("Email")}
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </label>
              <br />
              <label>
                Bio
                <textarea
                  rows="3"
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                />
              </label>
              <br />
              <div className="list-button">
                <button type="button" onClick={workExpChange}>
                  {t("Add")}
                </button>
              </div>
              <label>
                {t("Work Experience")}
                <input
                  type="text"
                  value={workExp}
                  onChange={(e) => setWorkExp(e.target.value)}
                />
              </label>
               {(userData.workExp.length !== 0 ?
                (<div className="editChanges">
                  {userData.workExp.map(exp =><span style={{color: "black"}}>{exp}</span>)
                  .reduce((prev,curr) => [prev, <span style={{color: "black"}}>, </span>, curr])}
                </div>) 
              : (<div></div>)
              )}      
              <br />
              <div className="list-button">
                <button type="button" onClick={educationChange}>
                  {t("Add")}
                </button>
              </div>
              <label>
                {t("Education")}
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </label>
              {(userData.education.length !== 0 ?
                (<div className="editChanges">
                  {userData.education.map(education =><span style={{color: "black"}}>{education}</span>)
                  .reduce((prev,curr) => [prev, <span style={{color: "black"}}>, </span>, curr])}
                </div>) 
              : (<div></div>)
              )}
              <br />
            </div>
            <div className="edit-left-side">
              <div className="list-button">
                <button type="button" onClick={skillsChange}>
                  {t("Add")}
                </button>
              </div>
              <label>
                {t("Skills")}
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
              {(userData.skills.length !== 0 ?
                (<div className="editChanges">
                  {userData.skills.map(skill =><span style={{color: "black"}}>{skill}</span>)
                  .reduce((prev,curr) => [prev, <span style={{color: "black"}}>, </span>, curr])}
                </div>) 
              : (<div></div>)
              )}
              <br />
              <div className="list-button">
                <button type="button" onClick={languagesChange}>
                  {t("Add")}
                </button>
              </div>
              <label>
                {t("Languages")}
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                />
              </label>
              {(userData.languages.length !== 0 ?
                (<div className="editChanges">
                  {userData.languages.map(language =><span style={{color: "black"}}>{language}</span>)
                  .reduce((prev,curr) => [prev, <span style={{color: "black"}}>, </span>, curr])}
                </div>) 
              : (<div></div>)
              )}
              <br />
              <div className="list-button">
                <button type="button" onClick={volunteeringChange}>
                  {t("Add")}
                </button>
              </div>
              <label>
                {t("Volunteering")}
                <textarea
                  rows="3"
                  value={volunteering}
                  onChange={(e) => setVolunteering(e.target.value)}
                />
              </label>
              {(userData.volunteering.length !== 0 ?
                (<div className="editChanges">
                  {userData.volunteering.map(volunteering =><span style={{color: "black"}}>{volunteering}</span>)
                  .reduce((prev,curr) => [prev, <span style={{color: "black"}}>, </span>, curr])}
                </div>) 
              : (<div></div>)
              )}
              <br />
              <label>
                Resume
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                />
              </label>
             {resumeExists && (
  <button onClick={downloadResume}>
                {t("Download Resume")}
              </button>
              )}
              <br />
              <label>
                {t("Cover Letter")}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCoverLetterChange}
                />
              </label>
              {coverLetterExists && (
  <button onClick={downloadCoverLetter}>
                {t("Download CoverLetter")}
              </button>
                )}
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">{t("Save changes")}</button>
          </div>
        </form>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default EditUserProfile;
