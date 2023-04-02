import React, { useState, useContext, useEffect } from "react";
import "../css/editjobposting.css";
import { Context } from "../UserSession";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextField } from "@mui/material";
import swal from 'sweetalert';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditJobPosting() {

  const navigate = useNavigate();
  let locationURL = useLocation().pathname;
  let jobId = locationURL.split("/")[3];

  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  const userRole = sessionStorage.getItem("role");

  const [jobData, setjobData] = useState([]);

  useEffect(() => {
    if (userID) {
      fetchSession();
    }
    if (userRole !== "User") {
      fetchData();
    }
  },[]);

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

  const fetchData = async () => {
    axios.get(`https://connectin-api.onrender.com/jobs/edit/${jobId}`).then(response => {
      setjobData(response.data);
    });
  }

  const savePost = async e => {
    e.preventDefault();
    axios.post(`https://connectin-api.onrender.com/jobs/edit/${jobId}`, {
      job_id: jobData.job_id,
      title: jobData.title,
      description: jobData.description,
      salary: jobData.salary,
      category: jobData.category,
      location: jobData.location
    })
    .then(response => {
      console.log(response.data);
      swal("Saved!","Successfully updated the job posting!","success",{
        button:false,
        timer:2000
      });
      navigate("/jobs");
    })
    .catch(error => {
      console.log(error);
      swal("Failed!","Cannot update the job posting!","error",{
        button:false,
        timer:2000
      });
    });
  };

  if (userID && (userRole === "Recruiter" || userRole === 'Administrator')) {
    return (
      //Edit posting page
      <Container id="editPostcontainer">
        <Row>
          <Col md={12}>
            <div className="WrapperEditPost">
              <h3 className="Title"> EDIT YOUR POSTING </h3>
              <form onSubmit={savePost}>
                <div className="FormEditPost">
                  <label className="PlaceholderEditPost">Title</label>
                    <br></br>
                    <TextField sx={{width: { sm: 400, md: 600 }}} fullWidth className='editInput' id="job_title" value = {jobData.title} variant="outlined"
                     pattern="[a-zA-Z\s]+" onChange={e =>
                      setjobData({
                        ...jobData,
                        title: e.target.value
                      })
                    }/>
                  <br></br>
                  <br></br>
                  <label className="PlaceholderEditPost">Description</label>
                    <br></br>
                    <TextField sx={{width: { sm: 400, md: 600 }}} fullWidth className='editInput' id="job_description" multiline rows={6} value = {jobData.description} variant="outlined"
                     pattern="[a-zA-Z\s]+" onChange={e => setjobData({ ...jobData, description: e.target.value })}/>
                  <br></br>
                  <br></br>
                  <label className="PlaceholderEditPost">Annual Pay</label>
                    <br></br>
                    <TextField sx={{width: { sm: 400, md: 600 }}} fullWidth className='editInput' id="salary" value = {jobData.salary} variant="outlined"
                     pattern="\d+" onChange={e => setjobData({ ...jobData, salary: e.target.value })}/>
                  <br></br>
                  <br></br>
                  <label className="PlaceholderEditPost">Category(Full/Part Time)</label>
                    <br></br>
                    <TextField sx={{width: { sm: 400, md: 600 }}} fullWidth className='editInput' id="category" value = {jobData.category} variant="outlined"
                    pattern="\d+" onChange={e => setjobData({ ...jobData, salary: e.target.value })}/>                <br></br>
                  <br></br>
                  <label className="PlaceholderEditPost">
                    Location {" "}
                    <br></br>
                    <TextField sx={{width: { sm: 400, md: 600 }}} fullWidth className='editInput' id="job_title" value = {jobData.location} variant="outlined" pattern="[a-zA-Z\s]+" 
                    onChange={e => setjobData({ ...jobData, location: e.target.value })}/>
                  </label>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <button type="submit" className="SaveButton">
                    Save {" "}
                  </button>
                </div>
                <br></br>
                <br></br>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container id="editPostcontainer">
        <br />
        <h1 style={{ textAlign: "center" }}>You need to be a recruiter
        or an administrator to edit job postings!</h1>
      </Container>
    );
  }
}

export default EditJobPosting;
