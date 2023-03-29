import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserSession";
import { FaRegEdit } from "react-icons/fa";
import "../css/JobPosting.css";
import axios from "axios";
import swal from "sweetalert";

const JobPosting = () => {
  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  const userRole = sessionStorage.getItem("role");

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

  const [checked, setChecked] = useState(false);
  const [selects, setSelects] = useState();

  if (userID && (userRole === "Recruiter" || userRole === "Administrator")) {
    return (
      <div className="Jobpostingform">
        <h1 className="titleofpage">Job Posting Page</h1>
        <div className="title">
          <TextField id="job_title" label="Job Title" variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="company">
          <TextField id="company_name" label="Company" variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="description">
          <TextField id="job_description" label="Job Description" placeholder="Placeholder" multiline variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="salary">
          <TextField id="salary" label="Salary/Pay" variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="location">
          <TextField id="location" label="Location" placeholder="Placeholder" multiline variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="selection">
          <div className="category">
            <select id="category" onChange={e => setSelects(e.target.value)}>
              <option label="Category..."></option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="work_type">
            <select id="work_type" onChange={e => setSelects(e.target.value)}>
              <option label="Worktype..."></option>
              <option value="onSite">On-Site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <br />
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              value={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
            Advertise jobs to third party platform
          </label>
        </div>
        <div className="jobAd">
          <br />
          {checked ? "Your job will be advertised on a third party platform!" : ""}
        </div>
        <br />
        <br />
        <button className="button" onClick={() => createJob()}>
          Post/Save
        </button>
      </div>
    );
  } else {
    return (
      <div className="Jobpostingform">
        <h1 style={{ textAlign: "center" }}>You need to be a recruiter or an administrator to post jobs!</h1>
      </div>
    );
  }
};

export default JobPosting;

const createJob = async () => {
  try {
    const jobData = {
      job_id: Math.floor(Math.random() * 1000000), // generate a random job_id for testing
      recruiter_id: sessionStorage.getItem("userID"),
      title: document.getElementById("job_title").value,
      company: document.getElementById("company_name").value,
      description: document.getElementById("job_description").value,
      salary: document.getElementById("salary").value,
      category: document.getElementById("category").value,
      location: document.getElementById("location").value,
      work_type: document.getElementById("work_type").value,
      thirdParty: document.getElementById("checkbox").value
    };
    const response = await axios.post(`http://localhost:9000/jobs/create`, jobData).then(swal("Job posting created successfully!"));
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const getJobs = async () => {
  try {
    const response = await axios.get("/jobs");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
