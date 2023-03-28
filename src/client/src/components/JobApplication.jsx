import React, { useEffect, useState } from "react";
import "../css/jobApplication.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button'
import swal from 'sweetalert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Context } from "../UserSession";
import { useContext } from "react";



const JobApplication = () =>{

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

    const location = useLocation();
    const job = location.state;
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);

    const handleResumeChange = (e) => {
      setResume(e.target.files[0]);
    };
  
    const handleCoverLetterChange = (e) => {
      setCoverLetter(e.target.files[0]);
    };

    //User id hard coded for now until we get user session fixed. 
    // const userId = "63f41b0123e995b64434ece0";
    
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const submitApplication = async () =>{

      const resumeData = new FormData();
      resumeData.append("resume", resume);
      
      const coverLetterData = new FormData();
      coverLetterData.append("coverLetter", coverLetter);

        const alreadyJobsApplied = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`)

        if(fname.trim().length === 0 || lname.trim().length === 0 || email.trim().length ===0 || phoneNumber.trim().length ===0){
          swal("Please fill up all the fields!",{
                
          });

        }
        // jobsApplied.find(object => object.job_id == job.job_id) != undefined
        else if(alreadyJobsApplied.data.find(object => object.job_id == job.jobState.job_id) != undefined){
        // else if(alreadyJobsApplied.data.includes(job.jobState.job_id)){
            swal("You've already applied for this job!",{
                
            });
            await delay(1000);
            navigate("/jobs");
        }
        else{

            await axios.post(`http://localhost:9000/users/${job.jobState.recruiter_id}/receivedApplications`, {
              applicationDetails:{

                job_id: job.jobState.job_id,
                job_title: job.jobState.title,
                userID: userID,
                fname: fname,
                lname: lname,
                email: email,
                phoneNumber: phoneNumber,
                cv: cv

              }
            })
            
            await axios.post(`http://localhost:9000/users/${userID}/jobsApplied`, {
                userId: userID,
                jobId: job.jobState.job_id
            }).then((response) => {
              console.log(response.data);
              axios.post(`http://localhost:9000/resume/uploadResume/${userID}`, resumeData)
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
              axios.post(`http://localhost:9000/resume/uploadCoverLetter/${userID}`, coverLetterData)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))});
            swal("You've successfully applied for this job!",{
                confirm: true,
                
            });
            await delay(1000);
            navigate("/jobs");
        }
    }

    const backFunction = () =>{
        navigate("/jobs");
    }

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cv, setCV] = useState();
    
    return(

        <div data-testid="JAPage"className="JAPContainer">
            

            <button onClick = {backFunction}><ArrowBackIcon/></button>

            <div className="jobDetails">
            <h1>You're applying for the following job:</h1>
            <p> Title: {job.jobState.title}</p>
            <p> Description: {job.jobState.description}</p>
            <p>Salary: ${job.jobState.salary}</p>
            <p>Category: {job.jobState.category}</p>
            <p>Location: {job.jobState.location}</p>
            </div>
            
            <div className="jobApplicationForm">
                
            <form>
            
                <TextField className ="textbox" onChange = { (e) => {setFname(e.target.value)}} id="fname" label="First Name" variant="outlined" />
                <TextField className ="textbox"  onChange = { (e) => {setLname(e.target.value)}} id="lname" label="Last Name" variant="outlined" />
                <br/>
                <TextField className ="textbox"  onChange = { (e) => {setEmail(e.target.value)}} id="email" label="Email" variant="outlined"  />
                <TextField className ="textbox"  onChange = { (e) => {setPhoneNumber(e.target.value)}}id="phoneNumber" label="Phone Number" variant="outlined"/>
                <br/>
                
                <label>
                Resume
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                />
              </label>   
              <br />
              <label>
                Cover Letter
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCoverLetterChange}
                />
              </label>
        

            </form>


                <Button className ="sendApplicationButton" onClick ={submitApplication} variant="contained" component="label">
                    Send Application

                </Button>

            </div>

        
        
        </div> 
        
 
        );
    }
    export default JobApplication;