import { TextField } from "@mui/material";
import React, { useState, useContext, useEffect, useRef } from "react";
import "../css/Chat.css";
import styled from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Context } from "../UserSession";
import axios from "axios";
import io from "socket.io-client";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const Chat = () => {

  const socket = io.connect("http://localhost:9000", ()=>{
    console.log("connection to backend from frontend works!")
  })
  

 

  const [userConnections, setUserConnections] = useState(
    {
      _id: "",
      firstname: "",
      lastname: "",
      connections: [],
    }
  );
   //Global loginState
   const [login, setLogin] = useContext(Context);
   const [messages, setMessages] = useState("");
  //  const [room, setRoom] = useState("");
   const scrollRef = useRef();
   const from = "6402817b781fecbdadf6c992";
   const to = "6402a4c6db0c6f36e8f531a8";
   const room = "room1"

  

   //Get id of logged in user
   const userID = sessionStorage.getItem("userID");
 
  //  useEffect(() => {
  //    if (userID) {
  //      fetchSession();
  //    }
  //  }, []);

  //     //Having the loginState persist on all page
  //     const fetchSession = async () => {
  //       try {
  //         if (userID) {
  //           setLogin({
  //             isLoggedIn: true,
  //           });
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

        //Make the request only on the first render
  useEffect(() => {
    if (userID) {
      fetchUserConnections();
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
   
   const fetchUserConnections = async () => {

    try{
      if(userID){
        const response = await axios.get(
          `http://localhost:9000/users/profile/${userID}`
        );

        setUserConnections({
          _id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          connections: response.data.connections,

        });
        // console.log(response.data);
      }
    }catch (error) {
      console.log(error);
   }
  };
 const sendMessage = ()=>{
  socket.emit("from_sendMessage", messages);
  setMessages("");
  joinRoom();
 }

 const joinRoom = () =>{
  socket.emit("join_room", room);
 }

 const receiveMessage = ()=>{

  socket.to(room).emit("to_receiveMessage", room)
 }

  return (
    <div className="conatiner">
      <div className="chatbox">
        <div className="userpic">
          <h2 className="username">Jane Doe</h2>
        </div>
        <div class="vl"></div>
        <div className = "chat-messages">
          <div ref={scrollRef}>
            <div className={`message sended`}>
              <div className="content ">
                <p>Test</p>
              </div>
            </div>
            <div className={`message received`}>
              <div className="content ">
                <p>Hello there.</p>
              </div>
            </div>
          </div>
          {/* {messages.map((message) => {
            return (
              <div ref={scrollRef}>
                 <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
              </div>
            )
          })} */}
        </div>
          
        
      {/* <div className="message-container">
        <div className="emoji">
          <BsEmojiSmileFill />
        </div>
      </div>
      <form className="input-container" >
        <input
          type="text"
          placeholder="type your message here"
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form> */}

        <div className="message-container">
          <input type="textbox" placeholder="Type your message here" name="message" onChange={(e) =>setMessages(e.target.value)}/>
          <button onClick= {sendMessage}> Press here</button>
        </div>

      </div>
      <div className="contacts">
      <h2 className="mycontact">My Contacts</h2>
  <ul className="ul">
    {userConnections.connections.map((name, index) => {
      const [firstname, lastname] = name.split(' ');
      return (
        <li key={index} className="connectionsInfo">
          <img
            src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
            alt="comapnyPic"
            className="companyPic"
          />
          <div>
            <span className="connectionName">{firstname} {lastname}</span>
          </div>
        </li>
      );
    })}
  </ul>
  </div>
</div>
  );
};

export default Chat;