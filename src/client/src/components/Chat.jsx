import { TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import "../css/Chat.css";
import styled from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Context } from "../UserSession";



 
const Chat = () => {

   //Global loginState
   const [login, setLogin] = useContext(Context);

   //Get id of logged in user
   const userID = sessionStorage.getItem("userID");
 
   useEffect(() => {
     if (userID) {
       fetchSession();
     }
   }, []);
 
   
   //Having the loginState persist on all page
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
 
  return (
    <div className="conatiner">
      <div className="chatbox">
        <div className="userpic">
          <h2 className="username">Jane Doe</h2>
        </div>
        <div class="vl"></div>
        <div className="sender-message">
          <div className="sender-userpic"></div>
          <div className="sender-text">Hi, how are you?</div>
        </div>
        <div className="user-message">
          <div className="user-text">Hi, I am doing great! What about you?</div>
          <div className="user-userpic"></div>
        </div>
        <div className="message-container">
          <input
            className="message"
            fullWidth
            placeholder="Type your message here"
          />
          <SendRoundedIcon className="sendicon" />
          <AttachFileIcon className="attachicon" />
        </div>
      </div>
      <div className="contacts">
        <h2 className="mycontact">My Contacts</h2>
        <div>
          <ul className="ul">
            <l1 className="connectionsInfo">
              <img
                src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                alt="comapnyPic"
                className="companyPic"
              ></img>
              <div>
                <span className="connectionName">John Doe</span>
              </div>
            </l1>
            <l1 className="connectionsInfo">
              <img
                src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                alt="comapnyPic"
                className="companyPic"
              ></img>
              <div>
                <span className="connectionName">Jane Doe</span>
              </div>
            </l1>
            <l1 className="connectionsInfo">
              <img
                src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                alt="comapnyPic"
                className="companyPic"
              ></img>
              <div>
                <span className="connectionName">Jack Billionaire</span>
              </div>
            </l1>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
