import React from "react";
import axios from "axios";
import "../css/receivedApplicationsForRecruiters.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Context } from "../UserSession";
import { useContext } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from "react-router-dom";



const ReceivedApplications = () => {
  const userID = sessionStorage.getItem("userID");
  const userRole = sessionStorage.getItem("role");

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
    const { data } = await axios.get(`http://localhost:9000/users/${userID}/receivedApplications`);

    setReceivedApplications(data);
  };

  const navigateBackToSignIn = () => {
    navigate("/signin");
  };
    
const styles = {

  largeIcon: {
    width: 10,
    height: 10,
  },

}

  

  const downloadResume = async (user_id) => {
    const response = await fetch(`/resume/getResume/${user_id}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user_id}-resume.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCoverLetter = async (user_id) => {
    const response = await fetch(`/resume/getCoverLetter/${user_id}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user_id}-coverLetter.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div>
      {userID && (userRole === "Recruiter" || userRole === "Administrator") ? (
        <div className="jobsApplied">
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
                  <Th>Cover Letter</Th>
                </Tr>
              </Thead>
              {receivedApplications.map(receivedApplication => (
                <div key={receivedApplication.job_id} className="jobPost">
                  <Tbody>
                    <Tr>
                      <div className="jobContent">
                        
                        <Th>{receivedApplication.job_id}</Th>

                        <Th>
                          
                          {receivedApplication.job_title}
                        </Th>
                        <Th>
                          
                          <p>
                            <Link 
                             to={`/users/search/${receivedApplication.userID}`} style={{ textDecoration: "none", color: "#19718d" }}><p>{receivedApplication.fname}</p></Link>
                            
                          </p>
                        </Th>
                        <Th>
                          <p>
                            
                            {receivedApplication.lname}
                          </p>
                        </Th>
                        <Th>
                          
                              
                              {receivedApplication.email}
                           
                        </Th>
                        <Th>
                          
                              
                              {receivedApplication.phoneNumber}
                            
                        </Th>
                        <Th>
                          
                              
                        <button onClick={() => downloadResume(receivedApplication.userID)}>
                        <DownloadIcon/></button>


                            
                        </Th>
                        <Th>
                          
                              
                          <button onClick={() => downloadCoverLetter(receivedApplication.userID)}>
                          <DownloadIcon>
                         
                           </DownloadIcon >
                        
                           </button>
  
  
                              
                          </Th>
                      </div>
                    </Tr>
                  </Tbody>
                </div>
              ))}
            </div>
          </Table>
        </div>
        </div>
      ) : (
        <div>
          
          <h1 style={{ textAlign: "center" }}>
          You need to be a recruiter or an administrator to access this page!
          </h1>
          
          
        </div>
      )}
    </div>
  );
};

export default ReceivedApplications;
