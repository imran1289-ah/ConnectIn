import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../css/waitingConnections.css";
import axios from "axios";

const Clickme = async (first, last) => {
  console.log(first);
  console.log(last);
    axios
      .post(`http://localhost:9000/users/newConnection`, {
        firstname: first,
        lastname: last
      })
      .then((response) => {
        Clickmetoo(`${first}`,`${last}`)
        console.log(response.data);
        alert("Succesfully added user " + " " + " to connections!");
      })
    .catch((error) => {
      console.log(error);
      //alert("Cannot connect");
    });
}
const Clickmetoo = async (first, last) => {
  console.log(first);
  console.log(last);
    axios
      .patch(`http://localhost:9000/users/deleteAwaiting`, {
        firstname: first,
        lastname: last
      })
      .then((response) => {
        console.log(response.data);
        alert("Succesfully removed " + first+"  "+ last + " in awaiting connections!");
      })
    .catch((error) => {
      console.log(error);
      //alert("Cannot connect");
    });
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
            <button className="acceptButton" onClick={() => Clickme(`${object.firstname}`,`${object.lastname}`)}>Accept</button>
            <button className="rejectButton" onClick={() => Clickmetoo(`${object.firstname}`,`${object.lastname}`)}>Reject</button>
        </div>
    </div>
  </div>
  ))}
</div>

  );
};

export default WaitingConnections;
