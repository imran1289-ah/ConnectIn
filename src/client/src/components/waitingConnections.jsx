import { margin } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import "../css/waitingConnections.css";
import axios from "axios";
import Navbar from "./Navbar";
import LoginFooter from "./LoginFooter"
//import logo from "./images/acceptButton";
import swal from "sweetalert";
import { Context } from "../UserSession";
import { Link, Navigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WaitingConnections = () => {

const AddSelftoFriends = async(user_id) =>{
  axios
  .post(`https://connectin-api.onrender.com/users/newConnection`, {
    firstname: sessionStorage.getItem("firstname"),
    lastname: sessionStorage.getItem("lastname"),
    userID :sessionStorage.getItem("userID") ,
    _id: user_id,
    //roomID:  user_id + sessionStorage.getItem("userID") ,

  })
}


  const Acceptbutton = async (first, last, user_id) => {
    console.log(first);
    console.log(last);
    axios
      .post(`https://connectin-api.onrender.com/users/newConnection`, {
        firstname: first,
        lastname: last,
        userID: user_id,
        _id: sessionStorage.getItem("userID"),
        // roomID: user_id +sessionStorage.getItem("userID"),
      })
      .then((response) => {
        AddSelftoFriends(`${user_id}`);
        DeleteWaitingConnection(`${first}`, `${last}`, `${user_id}`);
      })
      .catch((error) => {
        console.log(error);
        swal("Failed!", "Failed to add user to connections!", "error", {
          button: false,
          timer: 2000,
        });
      });

    await axios
      .post("https://connectin-api.onrender.com/rooms/addRoom", {
        userID_1: user_id,
        userID_2: sessionStorage.getItem("userID"),
      })
      .then((response) => {
        console.log(response);
      });
  };

  const DeleteWaitingConnection = async (first, last, user_id) => {
    console.log(first);
    console.log(last);
    axios
      .patch(`https://connectin-api.onrender.com/users/deleteAwaiting`, {
        firstname: first,
        lastname: last,
        userID: user_id,
        _id: sessionStorage.getItem("userID"),
      })
      .then((response) => {
        swal(t("Success!"), t("Updated waiting connections!"), "success", {
          button: false,
          timer: 2000,
        });
        //window.location.reload();
      })
      .then((response) => {
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        swal("Failed!", "Failed to add user to connections!", "error", {
          button: false,
          timer: 2000,
        });
      });
  };

  const navigate = useNavigate();

  //Global state
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (userID) {
      fetchSession();
      fetchData();
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

  const [userRequests, setUserRequests] = useState([]);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  const fName = console.log(sessionStorage.getItem("firstname"));
  const lName = console.log(sessionStorage.getItem("lastname"));
  const fetchData = async () => {
    console.log(userID);
    await axios.post(`https://connectin-api.onrender.com/users/waitingConnections`,{
      user_id: userID
    }).then(response => {
      setUserRequests(response.data)
    })
  }
  

  return (
    //Connection request acceptance or denial page
    <div>
      {userID && login ? (
        <div className="background">
          <h1>{t("Pending connections requests")}</h1>
          {
            userRequests.length < 1 ? (<p> {t("You have no connection requests!")}</p>):(<></>)
          }
          {userRequests.map((object) => (
            <div className="userWaitingConnection">
              <div className="connectionDisplay">
                <div className="anotherdiv" > 
                  <table className="connectionsTable">
                    <tr className="connectionsTableRowAndColumn ">
                      <td className="connectionsTableRowAndColumn ">
                        <img
                          margin="20px"
                          src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                          alt="comapnyPic"
                          className="companyPic"
                        ></img>
                      </td>
                      <td className="connectionsTableRowAndColumn ">
                        <h3>
                          {object.firstname} {object.lastname}
                        </h3>
                        
                      </td>
                      <td className="connectionsTableRowAndColumn ">
                        {/* <img src = './images/acceptButton' alt= "bad"
                  >
                    
                  </img>  */}
                        <button
                          className= "acceptButton"
                          onClick={() =>
                            Acceptbutton(
                              `${object.firstname}`,
                              `${object.lastname}`,
                              `${object.userID}`
                            )
                          }
                        >
                          {t("Accept")}
                        </button>
                                                <button
                          className="rejbectButton"
                          onClick={() =>
                            DeleteWaitingConnection(
                              `${object.firstname}`,
                              `${object.lastname}`,
                              `${object.userID}`
                            )
                          }
                        >
                          {t("Reject")}
                        </button>
                      </td>
                      <td className="connectionsTableRowAndColumn ">

                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default WaitingConnections;
