import ContainerCSS from "../css/ChatContainer.module.css";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";


const ChatContainer = ({ currentChat, socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messagesEndRef = useRef(null);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetchMessages()
  },[currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        const processedMessages = response.data.map((message) => {
          if (message.downloadLink !=="http://localhost:9000/messages/download/null") {
            message.message = (
              <a href={message.downloadLink} target="_blank" rel="noreferrer">
                {message.message}
              </a>
            );
          }
          return message;
        });
        setMessages(processedMessages)
      }
    } catch (error) {
      console.log(error);
    }    
  };

  const handleSendMsg = async (msg, file) => {
    const data = {
      message: msg,
      from: userID,
      to: currentChat.userID,
      room: room,
      value: new Date(Date.now()),
      file: file,
    };
    if (msg.length !== 0 || file) {
      socket.emit("sendMessage", data);
      await axios.post("http://localhost:9000/messages/addMessage", data);
      let messageText = msg;
      if (file && file.downloadLink) {
        messageText = (
          <a href={file.downloadLink} target="_blank" rel="noreferrer">
            {msg}
          </a>
        );
      }
      setMessages([...messages, { fromSelf: true, message: messageText, file: file }]);
    }
  };
    
  useEffect(() => {
    console.log("222222")
    socket.on("receiveMessage", (data) => {
      console.log("!!!!!!")
      
      setMessages((list) => [...list, data]);
    });
  }, [socket]);
  
  return (
    <div className={ContainerCSS.container}>
      <div className={ContainerCSS.header}>
        <span>{currentChat.firstname} {currentChat.lastname}</span>
      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.chatBox}>
        
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <div className={ContainerCSS.messagesContainer} key={index}>
            {message.fromSelf ? (
              <div className={ContainerCSS.sent}>
                <div className={ContainerCSS.textSent}>{message.message}</div>
              </div>
            ) : (
              <div className={ContainerCSS.received}>
                <div className={ContainerCSS.textReceived}>{message.message}</div>
              </div>
            )}
            {isLastMessage && <div ref={messagesEndRef} />}
          </div>
        );
      })}

      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.input}>
        <ChatInput handleSendMsg={handleSendMsg} from={userID} to={currentChat.userID} />
      </div>

    </div>
    
  ); 
}
export default ChatContainer;