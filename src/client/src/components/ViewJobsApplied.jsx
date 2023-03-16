import React from "react";
import axios from "axios";
import "../css/viewJobsApplied.css";
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
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchAppliedJob = async () => {
    const { data } = await axios.get(`http://localhost:9000/users/${userID}/jobsObjectApplied`);

    setJobsApplied(data);
  };

  const navigateBackToSignIn = () =>{
    navigate("/signin")
}


  return (
    <div className="jobsApplied">

    {userID ? (
    <div>
      <h1>Jobs Applied Summary</h1>

      <table>
        <tr>
          <th>Job ID</th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
        </tr>
        {jobsApplied.map(job => (
          <div key={job.job_id}>
            <tr>
              <th>{job.job_id}</th>
              
              <th> {job.title}</th>
              <th> {job.company}</th>
              <th>{job.location}</th>
            </tr>
          </div>
        ))}
      </table>
      </div>
      ) : (<div className = "notLoggedInContent">
      <h1>Please login to your account!</h1> 
      <p>It looks like you are not logged in.</p>
      <Button onClick={navigateBackToSignIn} className ="redirectSignIn" variant="contained" component="label">
               <ArrowBack></ArrowBack> Back to Signin
      </Button>
  
  
  </div>)}
    </div>
  );
};

export default ViewJobsApplied;
