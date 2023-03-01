import React, { useEffect } from "react";
import "../css/jobApplication.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button'
import swal from 'sweetalert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const JobApplication = () =>{



    const location = useLocation();
    const job = location.state;

    //User id hard coded for now until we get user session fixed. 
    const userId = "63f41b0123e995b64434ece0";
    
    const navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const submitApplication = async () =>{
        const alreadyJobsApplied = await axios.get(`http://localhost:9000/users/${userId}/jobsApplied`)
        
        if(alreadyJobsApplied.data.includes(job.jobState.job_id)){
            swal("You've already applied for this job!",{
                
            });
            await delay(1000);
            navigate("/jobs");
        }
        else{

            axios.post(`http://localhost:9000/users/${userId}/jobsApplied`, {
                userId: userId,
                jobId: job.jobState.job_id
            })
            swal("You've successfully applied for this job!",{
                confirm: true
            });
            await delay(1000);
            navigate("/jobs");
        }
    }

    const backFunction = () =>{
        navigate("/jobs");
    }

    return(

        <div data-testid="JAPage"className="JAPContainer">

        <button onClick = {backFunction}><ArrowBackIcon/></button>

        <div className="jobDetails">
        <h1>You're applying for the following job:</h1>
        <p> Title: {job.jobState.title}</p>
        <p> Description: {job.jobState.description}</p>
        <p>Salary: ${job.jobState.salary}</p>
        <p>Category: {job.jobState.category}</p>
        </div>
        
        <div className="jobApplicationForm">

        <form>
        
            <TextField className ="textbox" id="fname" label="First Name" variant="outlined" defaultValue="Default fname"/>
            <TextField className ="textbox" id="lname" label="Last Name" variant="outlined" defaultValue="Default lname"/>
            <br/>
            <TextField className ="textbox" id="email" label="Email" variant="outlined" defaultValue="Default email" />
            <TextField className ="textbox" id="phoneNumber" label="Phone Number" variant="outlined" defaultValue="default phone"/>
            <br/>
            
            <Button className ="uploadButton"variant="contained" component="label">
                Upload CV
                <input hidden accept="image/*" multiple type="file" />
            </Button>
    

        </form>


            <Button className ="sendApplicationButton"onClick ={submitApplication} variant="contained" component="label">
                Send Application

            </Button>

        </div>

        

        </div> 
        
 
        );
    }
    export default JobApplication;