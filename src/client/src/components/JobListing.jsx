import React from "react";
import axios from "axios"
import "../css/jobListing.css";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Alert, AlertTitle } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import { Context } from "../UserSession";
import { useContext } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";


const JobListing = () =>{

        //Global loginState
    const [login, setLogin] = useContext(Context);

    //Get id of logged in user
    const userID = sessionStorage.getItem("userID");

    useEffect(() => {
    if (userID) {
        fetchSession();
    }
    }, []);

    //Having the loginState persist on all pages
    const fetchSession = async () => {
    try {
        if (userID) {
        setLogin({
            isLoggedIn: true,
        });
        }
    } catch (error) {
        console.log(error);
    }
    };

    const [jobs, setJobs] = useState([]);
    const [jobsApplied, setJobsApplied] = useState([]);

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
        const {data} = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`)
        
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
    
    const navigateBackToSignIn = () =>{
        navigate("/signin")
    }

    return(
            
        <div className="jobPosts_Container">
            
            {userID ? (
            
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

                                
                                <h3 className="jobTitle"><b>{job.title}</b></h3>
                                
                                <p><BusinessIcon></BusinessIcon>{job.company}</p>
                                <p><PlaceIcon></PlaceIcon>{job.location}</p>
                                

                                <div className="Tags">
                                    <h3 className="jobCategory"><WorkIcon/>{job.category}</h3>
                                    <h3 className="jobCategory"><WorkIcon/>{job.work_type}</h3>
                                
                                </div>
                            
                                
                                    <Button className ="selectButton"variant="contained" component="label">
                                                    <Link className="jobListLink"to = {`/jobs/${job.job_id}`} state = {{jobState:job}} >
                                                        Select
                                                </Link>
                                    </Button>

                            </div>
                            
                            {jobsApplied.find(object => object.job_id == job.job_id) != undefined ? <Alert className ="AlertJobListing" severity='info' variant="outlined"><AlertTitle>You've already applied for this job.</AlertTitle></Alert>: <></>}
                        
                        {/* <Link to = {`/jobs/edit/${job.job_id}`} state = {{jobState:job}}>
                            <button class = "edit">Edit</button>
                        </Link> */}
                        {/* <button class = "delete" onClick={(e) => deletePost(`${job.job_id}`,e)}>Delete</button> */}

                    </div>
                    ))}
                </div>
            </div>

            /* <div className="preferences">
                    <b>Preferences</b>
                    <div className="preference"> Software</div>
                    <div className="preference"> Full-time</div>
                    <div className="preference"> 120k or higher</div>
                    <button> Change</button>  
                    
            </div> */
            ): (<div className = "notLoggedInContent">
                <h1>Please login to your account!</h1> 
                <p>It looks like you are not logged in.</p>
                <Button onClick={navigateBackToSignIn} className ="redirectSignIn" variant="contained" component="label">
                         <ArrowBack></ArrowBack> Back to Signin
                </Button>
            
            
            </div>)}
        </div>
    );
}



export default JobListing;