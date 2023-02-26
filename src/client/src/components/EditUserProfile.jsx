import React, { useContext, useState, useEffect } from "react";
import "../css/EditUserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Store";

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

  useEffect(() => {
    fetchSession();
  }, []);

  //Having the loginState persist on all pages
  const fetchSession = async () => {
    try {
      setLogin({
        isLoggedIn: true,
      });
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
    axios
      .patch(
        `http://localhost:9000/users/profile/${sessionStorage.getItem(
          "userID"
        )}`,
        {
          bio: userData.bio,
          headLine: userData.headLine,
          languages: userData.languages,
          email: userData.email,
          education: userData.education,
          skills: userData.skills,
          workExp: userData.workExp,
          volunteering: userData.volunteering,
        }
      )
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
      <div className="left-side"></div>
      <form className="userProfileForm" onSubmit={submitEditProfile}>
        <div className="EditUserForm-Container">
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
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Work Experience
            <input
              type="text"
              value={workExp}
              onChange={(e) => setWorkExp(e.target.value)}
            />
          </label>
          <div className="list-button">
            <button type="button" onClick={workExpChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Education
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </label>
          <div className="list-button">
            <button type="button" onClick={educationChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Skills
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          <div className="list-button">
            <button type="button" onClick={skillsChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Languages
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
          </label>
          <div className="list-button">
            <button type="button" onClick={languagesChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Volunteering
            <textarea
              value={volunteering}
              onChange={(e) => setVolunteering(e.target.value)}
            />
          </label>
          <div className="list-button">
            <button type="button" onClick={volunteeringChange}>
              Add
            </button>
          </div>
          <br />
          <button type="submit">Save changes</button>
        </div>
        <label>
          Resume
          <input type="file" accept=".pdf" onChange={handleResumeChange} />
        </label>
        <br />
        <label>
          Cover Letter
          <input type="file" accept=".pdf" onChange={handleCoverLetterChange} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
