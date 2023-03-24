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
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';


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
    const [jobsWithFilter, setJobsWithFilter] = useState([]);
    const [preferences, setPreferences] = useState({
        category: "",
        location: "",
        work_type: ""
    });

    // "category:full-time,location:montreal"

    const navigate = useNavigate();
    useEffect( () => {
        fetchJobs();
        fetchAppliedJob();
    }, [])

    useEffect( () =>{
        fetchJobsWithFilter();
    }, [preferences])

   
    const fetchJobs = async () =>{
        const {data} = await axios.get('http://localhost:9000/jobs')
        setJobs(data)
    }
    const fetchJobsWithFilter = async () => {
        const {data} = await axios.post('http://localhost:9000/jobs', preferences)
        setJobs(data)
    }
  

    const fetchAppliedJob = async () =>{
        const {data} = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`)
       setJobsApplied(data);
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

                <><div className="jobFilter"><form>
                    <label>
                        Category:
                        <select name="category" onChange={(e) => setPreferences({ ...preferences, category: e.target.value })}>
                            <option value="">Select a category</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </label>
                    <br />
                    <label>
            Location:
            <input type="text" name="location" value={preferences.location} onChange={(e) => setPreferences({ ...preferences, location: e.target.value })} placeholder="Enter a location" />
        </label>
                    <br />
                    <label>
                        Work Type: 
                        <select name="work_type" onChange={(e) => setPreferences({ ...preferences, work_type: e.target.value })}>
                            <option value="">Select a work type</option>
                            <option value="onSite">Onsite</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </label>
                    <br />
                    {/* <button type="submit">Apply Filters</button> */}
                </form>
                </div>
                <div data-testid="jobPostsContainer" className="jobPosts">
                        <div className="heading">
                            <b>Job Posts</b>
                        </div>

                        <div class="jobs">
                            {jobs.map(job => (

                                <div key={job._id} className="jobPost">

                                    <div className="logo">
                                        <Avatar alt="Logo" src="./logo/logo.png" sx={{ width: 75, height: 75 }} />

                                    </div>



                                    <div className="jobContent">


                                        <h3 className="jobTitle"><b>{job.title}</b></h3>

                                        <p><BusinessIcon></BusinessIcon>{job.company}</p>
                                        <p><PlaceIcon></PlaceIcon>{job.location}</p>
                                        <p><MapsHomeWorkIcon></MapsHomeWorkIcon>{job.work_type}</p>

                                        <div className="Tags">
                                            <h3 className="jobCategory"><WorkIcon />{job.category}</h3>

                                        </div>

                                       
                                        <Button className="selectButton" variant="contained" component="label">
                                            <Link className="jobListLink" to={`/jobs/${job.job_id}`} state={{ jobState: job }}>
                                                Apply
                                            </Link>
                                        </Button>
                                      

                                    </div>

                                    {jobsApplied.find(object => object.job_id == job.job_id) != undefined ? <Alert className="AlertJobListing" severity='info' variant="outlined"><AlertTitle>You've already applied for this job.</AlertTitle></Alert> : <></>}

                                    {/* <Link to = {`/jobs/edit/${job.job_id}`} state = {{jobState:job}}>
<button class = "edit">Edit</button>
</Link> */}
                                    {/* <button class = "delete" onClick={(e) => deletePost(`${job.job_id}`,e)}>Delete</button> */}

                                </div>
                            ))}
                        </div>
                    </div></>

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