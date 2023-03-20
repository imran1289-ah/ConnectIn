import React from "react";
import axios from "axios";
import "../css/receivedApplicationsForRecruiters.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import { Context } from "../UserSession";
import { useContext } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ReceivedApplications = () => {
  const userID = sessionStorage.getItem("userID");

  const [receivedApplications, setReceivedApplications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchReceivedApplications();
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

  const fetchReceivedApplications = async () => {
    // const { data } = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`);

    // setReceivedApplications(data);
  };

  const navigateBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="jobsApplied">
      {userID ? (
        <div>
          <div className="heading">
            <h1>Applicants Summary</h1>
          </div>

          <Table>
            <div class="jobs">
              <Thead>
                <Tr>
                  <Th> Job ID</Th>
                  <Th>Job Title</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>CV</Th>
                </Tr>
              </Thead>
              {receivedApplications.map(receivedApplication => (
                <div key={receivedApplication.job_id} className="jobPost">
                  <Tbody>
                    <Tr>
                      <div className="jobContent">
                        <Th>
                          <div className="logo">
                            <Avatar alt="Logo" src="./logo/logo.png" sx={{ width: 75, height: 75 }} />
                          </div>
                        </Th>
                        <Th>{receivedApplication.job_id}</Th>

                        <Th>
                          {" "}
                          <h3 className="jobTitle">{receivedApplication.title}</h3>
                        </Th>
                        <Th>
                          {" "}
                          <p>
                            <BusinessIcon></BusinessIcon>
                            {receivedApplication.company}
                          </p>
                        </Th>
                        <Th>
                          <p>
                            <PlaceIcon></PlaceIcon>
                            {receivedApplication.location}
                          </p>
                        </Th>
                        <Th>
                          <div className="Tags">
                            <h3 className="jobCategory">
                              <WorkIcon />
                              {receivedApplication.category}
                            </h3>
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

export default ReceivedApplications;
