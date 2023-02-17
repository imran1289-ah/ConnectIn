import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../css/waitingConnections.css";

function Clickme() {
  alert("Button Works");
}

const waitingConnections = () => {
  return (
    //waitingConnections page

<div className="userWaitingConnection">
    <div className="connectionDisplay ">
        <div>
            <h3>Jhon Doe</h3>
            <button className="acceptButton" onClick={Clickme}>Accept</button>
            <button className="rejectButton" onClick={Clickme}>Reject</button>
        </div>
    </div>
</div>
  );
};

export default waitingConnections;
