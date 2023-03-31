import React from "react";
import axios from "axios";
import "../css/viewJobsApplied.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Context } from "../UserSession";
import { useContext } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

const ViewJobsApplied = () => {
  const userID = sessionStorage.getItem("userID");

  const [jobsApplied, setJobsApplied] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppliedJob();
  }, []);

  const [login, setLogin] = useContext(Context);

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
          isLoggedIn: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppliedJob = async () => {
    const { data } = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`);

    setJobsApplied(data);
  };

  const navigateBackToSignIn = () => {
    navigate("/signin");
  };

  const { t, i18n } = useTranslation();

  return (
    <div data-testid="jobsApplied-test"className="viewjobsApplied">
      {userID ? (

        
      
      <div>
        <table class="table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Title</th>
                <th>Job Company</th>
                <th>Job Location</th>
                <th>Job Category</th>
                <th>Job Work Type</th>
              </tr>
            </thead>
    <tbody>

      <tr>
      {jobsApplied.map(job =>{
        <div>
      
      
        
            <td data-label="Job ID">{job.job_id}</td>
            <td data-label="Job Title">{job.title}</td>
            <td data-label="Job Company">{job.company}</td>
            <td data-label="Job Location">{job.job_id}</td>
            <td data-label="Job Category">{job.job_id}</td>
            <td data-label="Job Worktype">{job.job_id}</td>
        
        </div>
      

      })}
      </tr>
     </tbody>
   </table>
          
          
</div>
        
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
  );
};

export default ViewJobsApplied;
