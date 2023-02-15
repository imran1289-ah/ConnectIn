import React from "react";
import axios from "axios"
import "../css/jobListing.css";
import {useEffect, useState} from "react";


const JobListing = () =>{
    const [jobs, setJobs] = useState([]);

    useEffect( () => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const {data} = await axios.get("http://localhost:9000/jobs")

        setJobs(data)
    }

    
    return(
            
        <div className="Container">
            
            
            <div className="jobPosts">
                <div className="heading">
                    <b>Job Posts</b>
                </div>

                {jobs.map(jobs => (
                    <div className="jobPost">
                        <p> Job id: {jobs.job_id}</p>
                        <p>Title: {jobs.title}</p>
                        <p>Description: {jobs.description}</p>
                        <p>Salary: {jobs.salary}</p>
                        <p>Company: {jobs.company}</p>
                        <p>Category: {jobs.category}</p>
                        <button> Select</button>
                    </div>
                ))}
               

                


            </div>

            <div className="preferences">
                    <b>Preferences</b>

                    <button> Change</button>  
                    
            </div>
            
        </div>
    );
}



export default JobListing;