import React from "react";
import axios from "axios"
import "../css/jobListing.css";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'


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
                        <Link to={"/jobs/" + jobs.job_id}>
                            <button>Select</button>
                        </Link>
                    </div>
                ))}
               

                


            </div>

            <div className="preferences">
                    <b>Preferences</b>
                    <div className="preference"> Software</div>
                    <div className="preference"> Full-time</div>
                    <div className="preference"> 120k or higher</div>
                    <button> Change</button>  
                    
            </div>
            
        </div>
    );
}



export default JobListing;