import React from "react";

import "../css/jobListing.css";



const jobListing = () =>{
    
    return(

        <div className="Container">

            <div className="jobPosts">
                <div className="heading">
                    <b>Job Posts</b>
                </div>
                <div className = "jobPost">
                    
                   <p>Job title </p>
                   <p>Job description </p>
                   <p>salary</p>
                   <p>contract type </p>
                   <p>Other information </p>
                   <button> Select</button>
                </div>

               </div>

            <div className="preferences">
                    <b>Preferences</b>

                    <button> Change</button>  
                    
            </div>
            
        </div>
    );
}



export default jobListing;