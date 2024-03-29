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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Container from "react-bootstrap/Container";
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
    const { data } = await axios.get(`https://connectin-api.onrender.com/users/${userID}/jobsApplied`);

    setJobsApplied(data);
  };

  const navigateBackToSignIn = () => {
    navigate("/signin");
  };

  const { t, i18n } = useTranslation();

  return (
    <div data-testid="jobsApplied-test" className="jobsApplied">
      {userID ? (
        <div>
          <div className="heading">
            <h1>{t("Jobs Applied Summary")}</h1>
          </div>

          <Table>
            <div class="jobs">
              <Thead>
                <Tr>
                  <Th> {""} </Th>
                  <Th>{t("Job ID")}</Th>
                  <Th>{t("Title")}</Th>
                  <Th>{t("Company")}</Th>
                  <Th>{t("Location")}</Th>
                  <Th>{t("Category")}</Th>
                </Tr>
              </Thead>
              {jobsApplied.map(job => (
                <div key={job.job_id} className="jobPost">
                  <Tbody>
                    <Tr>
                      <div className="jobContent">
                        <Th>
                          <div className="logo">
                            <Avatar alt="Logo" src="./logo/logo.png" sx={{ width: 75, height: 75 }} />
                          </div>
                        </Th>
                        <Th>{job.job_id}</Th>

                        <Th>
                          {" "}
                          <h3 className="jobTitle">{job.title}</h3>
                        </Th>
                        <Th>
                          {" "}
                          <p>
                            <BusinessIcon></BusinessIcon>
                            {job.company}
                          </p>
                        </Th>
                        <Th>
                          <p>
                            <PlaceIcon></PlaceIcon>
                            {job.location}
                          </p>
                        </Th>
                        <Th>
                          <div className="Tags">
                            {/* <h3 className="jobCategory"> */}
                              {/* <WorkIcon /> */}
                              {job.category}
                            {/* </h3> */}
                          </div>
                        </Th>
                      </div>
                    </Tr>
                  </Tbody>
                </div>
              ))}
            </div>
          </Table>
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
