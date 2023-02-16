import React from "react";
import "../css/jobApplication.css";
import { useLocation } from "react-router-dom";
import axios from "axios";



const JobApplication = () =>{

    const location = useLocation();
    const job = location.state;
    const userId = "63ec3858d054c2f0772df03c";

    const submitApplication = async () =>{
        try{
            axios.post(`http://localhost:9000/${userId}/jobsApplied`);
        }catch(err){

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




        <button> Send Application</button>

        </div>
        
        
    );
    }
    export default JobApplication;