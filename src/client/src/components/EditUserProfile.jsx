import React, { useContext, useState, useEffect } from "react";
import "../css/EditUserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../UserSession";

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

  const navigate = useNavigate();

  const submitEditProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    if (userID) {
      axios
        .patch(`http://localhost:9000/users/profile/${userID}`, {
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
          axios
            .post(
              `http://localhost:9000/resume/uploadResume/63f8efc91b1f68ef98ff0c56`,
              formData
            )
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
          axios
            .post(
              `http://localhost:9000/resume/uploadCoverLetter/63f8efc91b1f68ef98ff0c56`,
              formData
            )
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
    setUserData({ ...userData, languages: [...userData.languages, languages] });
    setLanguages("");
  };

  const educationChange = () => {
    setUserData({ ...userData, education: [...userData.education, education] });
    setEducation("");
  };

  const skillsChange = () => {
    setUserData({ ...userData, skills: [...userData.skills, skills] });
    setSkills("");
  };

  const workExpChange = () => {
    setUserData({ ...userData, workExp: [...userData.workExp, workExp] });
    setWorkExp("");
  };

  const volunteeringChange = () => {
    setUserData({
      ...userData,
      volunteering: [...userData.volunteering, volunteering],
    });
    setVolunteering("");
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
          <h1 className="edit-profile-title">Edit your profile</h1>
          <div className="EditUserForm-Container">
            <div className="edit-right-side">
              <label>
                Email
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
                  Add
                </button>
              </div>
              <label>
                Work Experience
                <input
                  type="text"
                  value={workExp}
                  onChange={(e) => setWorkExp(e.target.value)}
                />
              </label>
              <br />
              <div className="list-button">
                <button type="button" onClick={educationChange}>
                  Add
                </button>
              </div>
              <label>
                Education
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </label>
              <br />
            </div>
            <div className="edit-left-side">
              <div className="list-button">
                <button type="button" onClick={skillsChange}>
                  Add
                </button>
              </div>
              <label>
                Skills
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
              <br />
              <div className="list-button">
                <button type="button" onClick={languagesChange}>
                  Add
                </button>
              </div>
              <label>
                Languages
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                />
              </label>
              <br />
              <div className="list-button">
                <button type="button" onClick={volunteeringChange}>
                  Add
                </button>
              </div>
              <label>
                Volunteering
                <textarea
                  rows="3"
                  value={volunteering}
                  onChange={(e) => setVolunteering(e.target.value)}
                />
              </label>
              <br />
              <label>
                Resume
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                />
              </label>
              <br />
              <label>
                Cover Letter
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCoverLetterChange}
                />
              </label>
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">Save changes</button>
          </div>
        </form>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default EditUserProfile;
