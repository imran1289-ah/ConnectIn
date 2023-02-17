import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../css/waitingConnections.css";

function Clickme() {
  alert("Button Works");
}

const WaitingConnections = () => {
  return (
 //Connection request acceptance or denial page
<div className="background" >
  <h1>Pending connections requests</h1>
  <div className="userWaitingConnection">
    <div className="connectionDisplay ">
        <div>
            <h3 position={"center"}>Jhon Doe</h3>
            <button className="acceptButton" onClick={Clickme}>Accept</button>
            <button className="rejectButton" onClick={Clickme}>Reject</button>
        </div>
    </div>
  </div>
  <div className="userWaitingConnection">
    <div className="connectionDisplay ">
        <div>
            <h3 >Jack</h3>
            <button className="acceptButton" onClick={Clickme}>Accept</button>
            <button className="rejectButton" onClick={Clickme}>Reject</button>
        </div>
    </div>
  </div>
  
</div>

  );
};

export default WaitingConnections;
