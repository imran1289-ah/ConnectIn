import React, { useState, useContext, useEffect, useRef } from "react";
import "../css/Chat.css";
import { Context } from "../UserSession";
import axios from "axios";
import io from "socket.io-client";
import ChatCSS from "../css/Chat.module.css";
import { Container } from "@mui/system";
import Contacts from "./Contacts";
import styled from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatContainer from "./ChatContainer";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:9000")

const Chat = () => {
  
  const socket = io.connect("http://localhost:9000")
  

  // const sendMessage = () => {
  //   socket.emit()
  // };

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
   const [message, setMessage] = useState("");
  //  const [room, setRoom] = useState("");
   const scrollRef = useRef();
   const from = "6402817b781fecbdadf6c992";
   const to = "6402a4c6db0c6f36e8f531a8";
   const room = "room1"

  
   const [currentChat, setCurrentChat] = useState(undefined);

   //Get id of logged in user
   const userID = sessionStorage.getItem("userID");
 
   useEffect(() => {
     if (userID) {
       fetchSession();
       fetchUserConnections();
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

  const data = {
    message: message,
    from: from,
    to: to,
    room: room,
    value: new Date(Date.now())
  }
  if(message.length !=0){
    socket.emit("sendMessage", data);
  }
    joinRoom();
    setMessage("");
 }

 const joinRoom = () =>{

  socket.emit("joinRoom", room);
 }

 useEffect(()=>{
    socket.on("receiveMessage", (data)=>{
      console.log(data.message)
    })
 }, [socket])

  const handleChangeChat = (chat) => {
    setCurrentChat(chat)
  }
 

//  const joinRoom = () =>{
//   socket.emit("join_room", room);
//  }


  return (
    <>
    <Container>
      <div className={ChatCSS.container}>
        {console.log(userConnections.connections)}
        <div>
          <Contacts connections={userConnections.connections} changeChat={handleChangeChat} />
        </div>
        <div className={ChatCSS.chat_container}>
        {currentChat === undefined ? (
          <h1>Select a chat</h1>
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket}/>
        )}
        </div>

      </div>
    </Container>
    </>
  );
};

export default Chat;