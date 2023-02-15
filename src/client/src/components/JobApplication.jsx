import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/jobApplication.css";



const JobApplication= () =>{

    const [job, setJob] = useState();
    const fetchData = async (req, res) =>{
        

    }

    useEffect( () =>{

    }, []

    )
    
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