import React from "react";
import axios from "axios";
import "../css/jobListing.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Alert, AlertTitle } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import { Context } from "../UserSession";
import { useContext } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const JobListing = () => {
  //Global loginState
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

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
          isLoggedIn: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [jobs, setJobs] = useState([]);
  const [jobsApplied, setJobsApplied] = useState([]);
  const [jobsWithFilter, setJobsWithFilter] = useState([]);
  const [preferences, setPreferences] = useState({
    category: "",
    location: "",
    work_type: ""
  });
  const [currentPreferences, setCurrentPreferences] = useState();

  // "category:full-time,location:montreal"


  const navigate = useNavigate();
  useEffect(() => {
    fetchJobs();
    fetchAppliedJob();
    getUserPreferences();
  }, []);


  useEffect(() => {
    fetchJobsWithFilter();
  }, [preferences]);


  const fetchJobs = async () => {
    const { data } = await axios.get("https://connectin-api.onrender.com/jobs");
    setJobs(data);
  };
  const fetchJobsWithFilter = async () => {
    const { data } = await axios.post("https://connectin-api.onrender.com/jobs", preferences);
    setJobs(data);
  };

  const fetchAppliedJob = async () => {
    const { data } = await axios.get(`https://connectin-api.onrender.com/users/${userID}/jobsApplied`);
    setJobsApplied(data);
  };


  const deletePost = async (jobId, e) => {
    e.preventDefault();
    // console.log(jobId);
    axios
      .post(`https://connectin-api.onrender.com/jobs/delete/${jobId}`, {
        jobId: jobId
      })
      .then(response => {
        // console.log(response.data);
        alert("Remove Successful!");
        navigate("/jobs");
      })
      .catch(error => {
        console.log(error);
        alert("Update Failed! Please check the logs!");
      });
  };

  const navigateBackToSignIn = () => {
    navigate("/signin");
  };

  const savePreferences = async () => {
    if (preferences.category && preferences.location && preferences.work_type) {
      await axios.post(`https://connectin-api.onrender.com/users/${userID}/preferences`, preferences);
      setTimeout(() => {
        swal(t("Preferences saved successfully!"));
        window.location.reload();
      }, 1000);
      //   console.log(preferences);
    } else {
      swal(t("Please fill in all fields before saving preferences."));
    }
  };

  const getUserPreferences = async () => {
    const { data } = await axios.get(`https://connectin-api.onrender.com/users/${userID}`);
    setCurrentPreferences(data.user.preferences);
    console.log(currentPreferences);
  };

  return (
    <Container>
      <div className="jobPosts_Container">
        {userID ? (
          <>
            <div className="jobFilter">
              <form>
                <label>
                  {t("Category")}:
                  <select name="category" onChange={e => setPreferences({ ...preferences, category: e.target.value })}>
                    <option value="">{t("Select a category")}</option>
                    <option value="Full-Time">{t("Full-Time")}</option>
                    <option value="Part-Time">{t("Part-Time")}</option>
                    <option value="Internship">{t("Internship")}</option>
                  </select>
                  {currentPreferences && <>{currentPreferences.category && <span className="saved-preferences">{` (${currentPreferences.category})`}</span>}</>}
                </label>
                <br />
                <label>
                  {t("Location")}:
                  <input type="text" name="location" value={preferences.location} onChange={e => setPreferences({ ...preferences, location: e.target.value })} placeholder={t("Enter a location")} />
                  {currentPreferences && <>{currentPreferences.location && <span className="saved-preferences">{` (${currentPreferences.location})`}</span>}</>}
                </label>
                <br />
                <label>
                  {t("Work type")}:
                  <select name="work_type" onChange={e => setPreferences({ ...preferences, work_type: e.target.value })}>
                    <option value="">{t("Select a work type")}</option>
                    <option value="onSite">{t("Onsite")}</option>
                    <option value="Hybrid">{t("Hybrid")}</option>
                    <option value="Remote">{t("Remote")}</option>
                  </select>
                  {currentPreferences && <>{currentPreferences.work_type && <span className="saved-preferences">{` (${currentPreferences.work_type})`}</span>}</>}
                </label>
                <label>
                  <span className="preferences-message">({t("*Saved preferences")})</span>
                </label>
                <button type="button" onClick={savePreferences}>
                  {t("Save Preferences")}
                </button>
              </form>
            </div>
            <div data-testid="jobPostsContainer" className="jobPosts">
              <div className="heading">
                <b>{t("Job Posts")}</b>
              </div>

              <div className="jobs">
                {jobs.length != 0 ? (
                  <div>
                    {jobs.map(job => (
                      <Row>
                        <div key={job._id} className="jobPost">
                          <Col>
                            <div className="jobContent">
                              <h3 className="jobTitle">
                                <b>{job.title}</b>
                              </h3>

                              <p>
                                <BusinessIcon></BusinessIcon>
                                {job.company}
                              </p>
                              <p>
                                <PlaceIcon></PlaceIcon>
                                {job.location}
                              </p>
                              <p>
                                <MapsHomeWorkIcon></MapsHomeWorkIcon>
                                {job.work_type}
                              </p>

                              <div className="Tags">
                                <h3 className="jobCategory">
                                  <WorkIcon />
                                  {job.category}
                                </h3>
                              </div>
                              <div className="Tags">
                                <h3 className="jobCategory">${job.salary}/hour</h3>
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            {jobsApplied.find(object => object.job_id == job.job_id) != undefined ? (
                              <Alert className="AlertJobListing" variant="outlined">
                                <AlertTitle>{t("You've already applied for this job.")}</AlertTitle>
                              </Alert>
                            ) : (
                              <Alert className="YetAppliedJobs" severity="info" variant="outlined">
                                <AlertTitle>{t("You have yet to apply for this job.")}</AlertTitle>
                              </Alert>
                              // <></>
                            )}
                            {jobsApplied.find(object => object.job_id == job.job_id) == undefined ? (
                              <Button className="selectButton" variant="contained" component="label">
                                <Link className="jobListLink" to={`/jobs/${job.job_id}`} state={{ jobState: job }}>
                                  {t("Apply")}
                                </Link>
                              </Button>
                            ) : (
                              <></>
                            )}
                            {job.thirdParty == true && job.jobLink != null ? (
                              <Button className="linkButton" variant="contained" component="label">
                                <Link className="jobListLink" to={{ pathname: job.jobLink }} target="_blank">
                                  {t("Apply on company site")}
                                </Link>
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </div>
                      </Row>
                    ))}
                  </div>
                ) : (
                  <div className="NoJobsFound">
                    <h1>{t("No jobs found")}</h1>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="notLoggedInContent">
            <h1>Please login to your account!</h1>
            <p>It looks like you are not logged in.</p>
            <Button onClick={navigateBackToSignIn} className="redirectSignIn" variant="contained" component="label">
              <ArrowBack></ArrowBack> Back to Signin
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default JobListing;
