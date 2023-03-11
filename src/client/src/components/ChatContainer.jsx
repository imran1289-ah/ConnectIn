import ContainerCSS from "../css/ChatContainer.module.css";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";


const ChatContainer = ({ currentChat, socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetchMessages()
    },[currentChat]);
  
  

  const fetchMessages = async () => {
    try {
      if (userID) {
        const response = await axios.post(
          `http://localhost:9000/messages`,
          {
            from: userID,
            to: currentChat.userID
          }
        );
        // console.log(response.data)
        setMessages(response.data)
      }

    } catch (error) {
      console.log(error);
    }    
  }

  const handleSendMsg = async (msg) => {
    const data = {
      message: msg,
      from: userID,
      to: currentChat.userID,
      room: room,
      value: new Date(Date.now())
    }
    if(msg.length !=0){
      socket.emit("sendMessage", data);
    }
    setMessages("");
    socket.emit("sendMessage", data);
    await axios.post("http://localhost:9000/messages/addMessage", {
      from: userID,
      to: currentChat.userID,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    console.log(msgs);
    setMessages(msgs);
  };

  return (
    <div className={ContainerCSS.container}>
      <div className={ContainerCSS.header}>
        <span>{currentChat.firstname} {currentChat.lastname}</span>
      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.chatBox}>
        
      {messages.map((message) => {
        return(<div className={ContainerCSS.messagesContainer}>
          {message.fromSelf ? (<div className={ContainerCSS.sent}>
            <div className={ContainerCSS.textSent}>{message.message}</div>
          </div>):
          (<div className={ContainerCSS.received}>
            <div className={ContainerCSS.textReceived}>{message.message}</div>
            </div>)}
          </div>
        )
      })}

      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.input}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
    
  ); 
}
export default ChatContainer;