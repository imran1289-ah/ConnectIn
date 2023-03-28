import ContainerCSS from "../css/ChatContainer.module.css";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatContainer = ({ currentChat, socket, room }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const messagesEndRef = useRef(null);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      if (userID) {
        const response = await axios.post(
          `/messages`,
          {
            from: userID,
            to: currentChat.userID,
          }
        );
        const processedMessages = response.data.map((message) => {
          if (
            message.downloadLink &&
            message.downloadLink !==
              "https://connectin-api.onrender.com/messages/download/null"
          ) {
            message.message = (
              <a href={message.downloadLink} target="_blank" rel="noreferrer">
                {message.message }
              </a>
            );
          }
          return message;
        });
        setMessages(processedMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMsg = async (msg, file) => {
    const data = new FormData();
    data.append("message", msg.trim());
    data.append("from", userID);
    data.append("to", currentChat.userID);
    data.append("room", room);
    data.append("value", new Date(Date.now()));
    data.append("file", file);
  
    if (msg.trim().length !== 0 || file) {
      // emit message to server using socket connection
      socket.current.emit("sendMessage", {
        message: msg.trim(),
        from: userID,
        to: currentChat.userID,
        room: room,
        value: new Date(Date.now()),
        file: file,
      });
  
      try {
        const response = await axios.post(
          "/messages/addMessage",
          data
        );
  
        let messageObject = {
          fromSelf: true,
          message: msg.trim(),
          file: response.data,
        };
  
        if (response.data.downloadLink) {
          messageObject = {
            fromSelf: true,
            message: (
              <a
                href={response.data.downloadLink}
                target="_blank"
                rel="noreferrer"
              >
                {response.data.filename}
              </a>
            ),
            file: response.data,
          };
        }
  
        setMessages(prevMessages => [...prevMessages, messageObject]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.current.on("receiveMessage", (message) => {
      setArrivalMessage({
        fromSelf: false,
        message: message.message,
        file: message.file,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
      setArrivalMessage(null);
    }
  }, [arrivalMessage]);
  
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