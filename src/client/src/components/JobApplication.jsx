import React, { useEffect } from "react";
import "../css/jobApplication.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';



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
            swal("You've already applied for this job!");
            await delay(1000)
            navigate("/jobs");
        }
        else{

            axios.post(`http://localhost:9000/users/${userId}/jobsApplied`, {
                userId: userId,
                jobId: job.jobState.job_id
            })
            swal("You've successfully applied for this job!");
            await delay(1000)
            navigate("/jobs");
        }
    }


    return(

        <div data-testid="JAPage"className="JAPContainer">

        
        <p>Job ID : {job.jobState.job_id}</p>
        <p> Job Title: {job.jobState.title}</p>
        <p> Job Description : {job.jobState.description}</p>

        <form>
        

            <TextField className ="textbox" id="fname" label="First Name" variant="outlined" defaultValue="Default fname"/>
            <TextField className ="textbox" id="lname" label="Last Name" variant="outlined" defaultValue="Default lname"/>
            <br/>
            <TextField className ="textbox" id="email" label="Email" variant="outlined" defaultValue="Default email" />
            <TextField className ="textbox" id="phoneNumber" label="Phone Number" variant="outlined" defaultValue="default phone"/>
            <br/>
            
            <Button variant="contained" component="label" style={{
                borderRadius: 10,
                backgroundColor: "#19718d",
                fontSize: "14px",
                margin: "30px"
                }}>
                Upload CV
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        

        </form>


        <Button onClick ={submitApplication} variant="contained" component="label" style={{
                            borderRadius: 10,
                            backgroundColor: "#19718d",
                            fontSize: "14px",
                            margin: "30px"
                            }}>
            Send Application

        </Button>

        </div> 
        
 
        );
    }
    export default JobApplication;