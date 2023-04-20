import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../UserSession";
import { useContext } from "react";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import JobListCSS from "../css/JobList.module.css";
import "../css/JobList.css";
import Navbar from "./Navbar";
import LoginFooter from "./LoginFooter"

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { t, i18n } = useTranslation();
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

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://connectin-api.onrender.com/jobs/${userID}`);
      console.log(userID);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (job_id) => {
    try {
      // Display confirmation dialog using swal
      swal({
        title: t("Are you sure?"),
        text: t("This action cannot be undone!"),
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.post(`https://connectin-api.onrender.com/jobs/delete/${job_id}`);
          swal(t("Job successfully deleted!"));
          setJobs(jobs.filter((job) => job.job_id !== job_id));
        } else {
          swal(t("Job deletion canceled!"));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className={JobListCSS.body}>
      <Navbar />
      <div className="RecruiterJobs">
        <h1 className="pageTitle">{t("Job Postings Summary")}</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("Job Title")}</TableCell>
                <TableCell>{t("Company")}</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>{t("Salary")}</TableCell>
                <TableCell>{t("Location")}</TableCell>
                <TableCell>{t("Category")}</TableCell>
                <TableCell>{t("Work Type")}</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.job_id}>
                <TableCell component="th" scope="row">
                  {job.title}
                </TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.category}</TableCell>
                <TableCell>{job.work_type}</TableCell>
                <TableCell>
                  <Button variant="contained">
                    <Link to={`/jobs/edit/${job.job_id}`}>{t("Edit")}</Link>
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(job.job_id)}
                  >
                    {t("Delete")}
                  </Button>
                </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <LoginFooter />
    </div>
  );
};

export default JobList;
