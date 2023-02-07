import React from "react";
import axios from "axios";
import ".css/jobApplication.css"


const JobApplicationPage = () =>{

    const getJobList = async (e) => {
        e.preventDefault();
        axios.get("http://localhost:9000/jobs/:job_id", () =>{

        })
        .then((response) =>{

        })
        .catch((error) => {

        })

        }

    }
    return(

        <div className="JAPContainer">

        
        <p> Job Title </p>
        <p>  Job description</p>

        <p> Salary</p>

        
        <button> Apply</button>


        </div>
    );
