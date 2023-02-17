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
            
            
            <div data-testid = "jobPostsContainer" className="jobPosts">
                <div className="heading">
                    <b>Job Posts</b>
                </div>

                {jobs.map(job => (
                
                    <div key = {job._id} className="jobPost">
                        
                        <p> Job id: {job.job_id}</p>
                        <p>Title: {job.title}</p>
                        <p>Description: {job.description}</p>
                        <p>Salary: {job.salary}</p>
                        <p>Company: {job.company}</p>
                        <p>Category: {job.category}</p>
                        <Link to = {`/jobs/${job.job_id}`} state = {{jobState:job}}>
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