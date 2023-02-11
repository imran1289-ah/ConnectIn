import React from "react";
import axios from "axios";
import "../css/jobApplication.css";


const getJob = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:9000/jobs/:job_id", () =>{

    })
    .then((response) =>{

    })
    .catch((error) => {

    })

    }



const JobApplication= () =>{

    
    return(

        <div className="JAPContainer">
        
        <p>Job Posting Name</p>
        
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