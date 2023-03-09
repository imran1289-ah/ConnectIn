import React from "react";
import axios from "axios"
import "../css/viewJobsApplied.css";
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



const ViewJobsApplied = () =>{

        
        const userID = sessionStorage.getItem("userID");
    
        const [jobsApplied, setJobsApplied] = useState([]);
    
        const navigate = useNavigate();

        useEffect( () => {
            fetchAppliedJob();

        }, [])
    
    
    const fetchJobDetails = async () =>{
        jobsApplied.map()
    }

    const fetchAppliedJob = async () =>{
        const {data} = await axios.get(`http://localhost:9000/users/${userID}/jobsApplied`)
        
       setJobsApplied(data)
        
    }

return(
    <div className="jobsApplied">
     
            
            <h1>Jobs Applied Summary</h1>

            
            <table className="">
              <tr>
                <th>Job ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Image</th>
              </tr>
              
                {jobsApplied.map(id =>(
                    
                    <tr>
                        <th>{id}</th>
                    </tr>
                ))}
              

              
            </table> 


    </div>
  );
}

export default ViewJobsApplied;