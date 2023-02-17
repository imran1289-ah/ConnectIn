import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../css/waitingConnections.css";
import axios from "axios";

function Clickme() {
  alert("Button Works");
}


const WaitingConnections = () => {

  const [userRequests, setUserRequests] = useState([]);

  useEffect( () => {
      fetchData()
  }, [])

  const fetchData = async () => {
      const {data} = await axios.get(`http://localhost:9000/users/waitingConnections`,{
        _id: "63ec4acc2bb05555a5b97c46"
      })

      setUserRequests(data)
  }

  return (
 //Connection request acceptance or denial page
<div className="background" >
  <h1>Pending connections requests</h1>
  {userRequests.map((object) => (
  <div className="userWaitingConnection">
    <div className="connectionDisplay ">
        <div>
            <h3 position={"center"}>{object.firstname} {object.lastname}</h3>
            <button className="acceptButton" onClick={Clickme}>Accept</button>
            <button className="rejectButton" onClick={Clickme}>Reject</button>
        </div>
    </div>
  </div>
  ))}
</div>

  );
};

export default WaitingConnections;
