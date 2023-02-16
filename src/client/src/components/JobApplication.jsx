import React, { useEffect } from "react";
import "../css/jobApplication.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";




const JobApplication = () =>{

    const location = useLocation();
    const job = location.state;

    //User id hard coded for now until we get user session fixed. 
    const userId = "63edb27d0e77e161a004824c";
    
    const navigate = useNavigate();

    const submitApplication = async () =>{
        const alreadyJobsApplied = await axios.get(`http://localhost:9000/users/${userId}/jobsApplied`)
        
        if(alreadyJobsApplied.data.includes(job.jobState.job_id)){
            alert(`UserID ${userId} has already applied for this job!`);
            navigate("/jobs");
        }else{
            
        }
        
        
    }

    return(

        <div className="JAPContainer">
        
        <p>Job ID : {job.jobState.job_id}</p>
        <p> Job Title: {job.jobState.title}</p>
        <p> Job Description : {job.jobState.description}</p>
        <form>
        
        <input className="Textbox" type="text" name="fname" placeholder="First Name"/>
        <input className="Textbox" type="text" name="lname" placeholder="Last Name"/>
        <br/>
        <input className="Textbox" type="text" name="email" placeholder="Email"/>
        <input className="Textbox" type="text" name="phoneNumber" placeholder="Phone Number"/>
        <br/>
        <input className="cv" type="file" name="CV"/>
        

        </form>




        <button onClick={submitApplication}> Send Application</button>

        </div>
        
        
    );
    }
    export default JobApplication;