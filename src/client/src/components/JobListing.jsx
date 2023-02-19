import React from "react";
import axios from "axios"
import "../css/jobListing.css";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";



const JobListing = () =>{
    const [jobs, setJobs] = useState([]);


    const navigate = useNavigate();
    useEffect( () => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const {data} = await axios.get("http://localhost:9000/jobs")

        setJobs(data)
    }


    const deletePost = async (jobId,e) => {
        e.preventDefault();
        console.log(jobId);
        axios.post(`http://localhost:9000/jobs/delete/${jobId}`, {
          jobId: jobId,
        })
        .then(response => {
          console.log(response.data);
          alert("Remove Successful!");
          navigate("/jobs");
        })
        .catch(error => {
          console.log(error);
          alert("Update Failed! Please check the logs!");
        });
      };
    
    return(
            
        <div className="jobPosts_Container">
            
            
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
                        <Link to = {`/jobs/edit/${job.job_id}`} state = {{jobState:job}}>
                            <button class = "edit">Edit</button>
                        </Link>
                        <button class = "delete" onClick={(e) => deletePost(`${job.job_id}`,e)}>Delete</button>

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