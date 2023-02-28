import React from "react";
import axios from "axios"
import "../css/jobListing.css";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles';
import { Alert, AlertTitle } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';









const JobListing = () =>{
    const [jobs, setJobs] = useState([]);
    const [jobsApplied, setJobsApplied] = useState([]);
    const userId = "63f41b0123e995b64434ece0";

    const navigate = useNavigate();
    useEffect( () => {
        fetchJobs();
        fetchAppliedJob();
    }, [])

    const fetchJobs = async () => {
        const {data} = await axios.get("http://localhost:9000/jobs")

        setJobs(data)
    }

    const fetchAppliedJob = async () =>{
        const {data} = await axios.get(`http://localhost:9000/users/${userId}/jobsApplied`)
        
       setJobsApplied(data)
        
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
    
      const linkStyle = {
        height: "100%",
        width:"100%",
        display:'inline-block'
      };
    return(
            
        <div className="jobPosts_Container">
            
            
            <div data-testid = "jobPostsContainer" className="jobPosts">
                <div className="heading">
                    <b>Job Posts</b>
                </div>
                <div class="jobs">
                 {jobs.map(job => (
                
                    <div key = {job._id} className="jobPost">

                            <div className="logo">
                            <Avatar alt="Logo" src="./logo/logo.png" sx={{ width: 75, height: 75 }}/>

                            </div>
                        
                        
                        
                    <div className="jobContent">

                            {jobsApplied.includes(job.job_id) ? <Alert className ="AlertJobListing" severity='info' variant="outlined"><AlertTitle>You've already applied for this job</AlertTitle></Alert>: <></> }
                            <h3 className="jobTitle"><b>{job.title}</b></h3>
                            
                            <p>{job.company}</p>
                            <p>{job.location}</p>

                            <div className="Icons">
                                <h3 className="jobCategory"><WorkIcon/>{job.category}</h3>

                            </div>
                            
                                
                        <Button className ="selectButton"variant="contained" component="label">
                                        <Link className="jobListLink"to = {`/jobs/${job.job_id}`} state = {{jobState:job}} style ={linkStyle} >
                                            Select
                                       </Link>
                        </Button>
                                

                    </div>

                        
                        {/* <Link to = {`/jobs/edit/${job.job_id}`} state = {{jobState:job}}>
                            <button class = "edit">Edit</button>
                        </Link> */}
                        {/* <button class = "delete" onClick={(e) => deletePost(`${job.job_id}`,e)}>Delete</button> */}

                    </div>
                    ))}
                </div>
            </div>

            {/* <div className="preferences">
                    <b>Preferences</b>
                    <div className="preference"> Software</div>
                    <div className="preference"> Full-time</div>
                    <div className="preference"> 120k or higher</div>
                    <button> Change</button>  
                    
            </div> */}
            
        </div>
    );
}



export default JobListing;