import { TextField } from "@mui/material";
import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../css/jobPosting.css";

const JobPosting = () => {
  return (
    <div className="Jobpostingform">
      <div className="title">
        <TextField id="job_title" label="Job Title" variant="outlined" />
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
          required
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
      <div className="contract">
        <TextField
          required
          id="contract_type"
          label="Part Time/Full Time"
          variant="outlined"
        />
        <FaRegEdit />
      </div>
      <br />
      <br />
      <div className="other">
        <TextField
          id="other"
          label="Other"
          placeholder="Placeholder"
          multiline
          variant="outlined"
        />
        <FaRegEdit />
      </div>
      <br />
      <br />
      <button className="button">Post/Save</button>
    </div>
  );
};

export default JobPosting;
