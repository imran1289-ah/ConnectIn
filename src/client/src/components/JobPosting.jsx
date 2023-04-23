import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserSession";
import { FaRegEdit } from "react-icons/fa";
import "../css/JobPosting.css";
import axios from "axios";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const JobPosting = () => {
  //Global loginState
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

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
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [checked, setChecked] = useState(false);
  const [link, setLink] = useState();
  const [selects, setSelects] = useState();

  // const createJob = async () => {
  //   try {
  //     const jobData = {
  //       job_id: Math.floor(Math.random() * 1000000), // generate a random job_id for testing
  //       recruiter_id: sessionStorage.getItem("userID"),
  //       title: document.getElementById("job_title").value,
  //       company: document.getElementById("company_name").value,
  //       description: document.getElementById("job_description").value,
  //       salary: document.getElementById("salary").value,
  //       category: document.getElementById("category").value,
  //       location: document.getElementById("location").value,
  //       work_type: document.getElementById("work_type").value,
  //       thirdParty: document.getElementById("checkbox").value,
  //       jobLink: link
  //     };
  //     const response = await axios.post(`http://localhost:9000/jobs/create`, jobData).then(swal("Job posting created successfully!"));
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const createJob = async () => {
    try {
      const title = document.getElementById("job_title").value;
      const company = document.getElementById("company_name").value;
      const description = document.getElementById("job_description").value;
      const salary = document.getElementById("salary").value;
      const category = document.getElementById("category").value;
      const location = document.getElementById("location").value;
      const workType = document.getElementById("work_type").value;

      if (
        !title ||
        !company ||
        !description ||
        !salary ||
        isNaN(salary) || // check if salary is not a number
        !category ||
        !location ||
        !workType
      ) {
        swal(
          isNaN(salary)
            ? t("Please enter numbers in salary")
            : t("Please fill all required fields")
        );
        return;
      }

      const jobData = {
        job_id: Math.floor(Math.random() * 1000000), // generate a random job_id
        recruiter_id: sessionStorage.getItem("userID"),

        title,
        company,
        description,
        salary,
        category,
        location,
        work_type: workType,
        thirdParty: document.getElementById("checkbox").value,
        jobLink: link,
      };

      const response = await axios.post(
        `https://connectin-api.onrender.com/jobs/create`,
        jobData
      );
      swal({
        title: t("Job posting created successfully!"),
        icon: "success",
      }).then(() => {
        window.location.href = "/jobs"; // Redirect to Jobs
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (userID && (userRole === "Recruiter" || userRole === "Administrator")) {
    return (
      <div className="Jobpostingform">
        <h1 className="titleofpage">{t("Job Posting Page")}</h1>
        <div className="form">
          <div className="title">
            <TextField
              id="job_title"
              label={t("Job Title")}
              variant="outlined"
            />
          </div>
          <br />
          <br />
          <div className="company">
            <TextField
              id="company_name"
              label={t("Company")}
              variant="outlined"
            />
          </div>
          <br />
          <br />
          <div className="description">
            <TextField
              id="job_description"
              label="Description"
              placeholder="Placeholder"
              multiline
              variant="outlined"
            />
          </div>
          <br />
          <br />
          <div className="salary">
            <TextField id="salary" label={t("Salary")} variant="outlined" />
          </div>
          <br />
          <br />
          <div className="location">
            <TextField
              id="location"
              label={t("Location")}
              placeholder="Placeholder"
              multiline
              variant="outlined"
            />
          </div>
          {/* <br />
        <div className="title">
          <TextField id="job_title" label={t("Job Title")} variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="company">
          <TextField
            id="company_name"
            label={t("Company")}
            variant="outlined"
          />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="description">
          <TextField
            id="job_description"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="salary">
          <TextField id="salary" label={t("Salary")} variant="outlined" />
          <FaRegEdit />
        </div>
        <br />
        <br />
        <div className="location">
          <TextField
            id="location"
            label={t("Location")}
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
          <FaRegEdit />
        </div>
        {/* <br />
        <br />
        <div className="jobLink">
          <TextField id="job_link" label="Job Link" variant="outlined" onChange={e => setLink(e.target.value)} />
          <FaRegEdit />
        </div> */}
          <br />
          <br />
          <div className="selection">
            <div className="category">
              <select
                id="category"
                onChange={(e) => setSelects(e.target.value)}
              >
                <option label={t("Category")}></option>
                <option value="Full-Time">{t("Full-Time")}</option>
                <option value="Part-Time">{t("Part-Time")}</option>
                <option value="Internship">{t("Internship")}</option>
              </select>
            </div>
            <div className="work_type">
              <select
                id="work_type"
                onChange={(e) => setSelects(e.target.value)}
              >
                <option label={t("Work type")}></option>
                <option value="onSite">{t("On-Site")}</option>
                <option value="Remote">{t("Remote")}</option>
                <option value="Hybrid">{t("Hybrid")}</option>
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
              {t("Advertise jobs from third party platform")}
            </label>
          </div>
          <div className="jobAd">
            <br />
            {checked ? (
              <div className="jobLink">
                <TextField
                  id="job_link"
                  label={t("Job Link")}
                  variant="outlined"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            {checked ? <br /> : ""}
            {checked ? (
              <div className="thirdparty">
                {t("Your job will be advertised from a third party platform!")}
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <br />
          <button className="button" onClick={() => createJob()}>
            {t("Post/Save")}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Jobpostingform">
        <h1 style={{ textAlign: "center" }}>
          {t("You need to be a recruiter or an administrator to post jobs!")}
        </h1>
      </div>
    );
  }
};

export default JobPosting;

const getJobs = async () => {
  try {
    const response = await axios.get("https://connectin-api.onrender.com/jobs");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
