import { TextField } from "@mui/material";
import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../css/JobPosting.css";
import axios from "axios";

const JobPosting = () => {
  return (
    <div className="Jobpostingform">
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
        <TextField
          id="job_description"
          label="Job Description"
          placeholder="Placeholder"
          multiline
          variant="outlined"
        />
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
      <div className="category">
        <TextField id="category" label="Category" variant="outlined" />
        <FaRegEdit />
      </div>
      <br />
      <br />
      <div className="location">
        <TextField
          id="location"
          label="Location"
          placeholder="Placeholder"
          multiline
          variant="outlined"
        />
        <FaRegEdit />
      </div>
      <br />
      <br />
      <button className="button" onClick={() => createJob()}>
        Post/Save
      </button>
    </div>
  );
};

export default JobPosting;

const createJob = async () => {
  try {
    const jobData = {
      job_id: Math.floor(Math.random() * 1000000), // generate a random job_id for testing
      title: document.getElementById("job_title").value,
      company: document.getElementById("company_name").value,
      description: document.getElementById("job_description").value,
      salary: document.getElementById("salary").value,
      category: document.getElementById("category").value,
      location: document.getElementById("location").value,
    };
    const response = await axios.post(
      `http://localhost:9000/jobs/create`,
      jobData
    );
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
