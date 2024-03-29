import React, { useState, useContext, useEffect, useRef } from "react";
import "../css/Chat.css";
import { Context } from "../UserSession";
import axios from "axios";
import io from "socket.io-client";
import ChatCSS from "../css/Chat.module.css";
import ContactCSS from "../css/Contacts.module.css";
import { Container } from "@mui/system";
import Contacts from "./Contacts";
import ChatContainer from "./ChatContainer";
import { useTranslation } from "react-i18next";

const Chat = () => {
  const [userConnections, setUserConnections] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    connections: [],
  });
  //Global loginState
  const [login, setLogin] = useContext(Context);
  const [message, setMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [room, setRoom] = useState("");
  const { t, i18n } = useTranslation();

  const [currentChat, setCurrentChat] = useState(undefined);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  
  useEffect(() => {
     if (userID) {
        fetchSession();
       fetchUserConnections();
       socket.current = io.connect("https://connectin-api.onrender.com")
     }
   }, []);


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
    try {
      if (userID) {
        const response = await axios.get(
          `https://connectin-api.onrender.com/users/profile/${userID}`
        );

        setUserConnections({
          _id: response.data._id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          connections: response.data.connections,
        });
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeChat = async (chat) => {
    setCurrentChat(chat)
    // console.log(chat.userID)
    // console.log(userID);
    await axios.post("https://connectin-api.onrender.com/rooms",{
      userID_1: sessionStorage.getItem("userID"),
      userID_2: chat.userID
    }).then((response) =>{
      setRoom(response.data)
      socket.current.emit("joinRoom", response.data);
    })
}
 
  return (
    <>
    <Container>
      <div className={ChatCSS.container}>
        {/* {console.log(userConnections.connections)} */}
        <div data-testid="contacts-container">
          <Contacts connections={userConnections.connections} changeChat={handleChangeChat} />
        </div>
        <hr className={ChatCSS.line} /> 
        {/* <div className={ChatCSS.chat_container}> */}
        {currentChat === undefined ? (
          <div className={ContactCSS.selectHeader}>{t("Select a chat")}</div>
        ) : (
          <ChatContainer currentChat={currentChat} room={room} socket={socket}/>
        )}
        </div>

        {/* </div> */}
      </Container>
    </>
  );
};

export default Chat;
