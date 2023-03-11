import ContainerCSS from "../css/ChatContainer.module.css";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  const fetchMessages = async () => {
    try {
      if (userID) {
        const response = await axios.post(`http://localhost:9000/messages`, {
          from: userID,
          to: currentChat.userID,
        });
        setMessages(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMsg = async (msg) => {
    await axios.post("http://localhost:9000/messages/addMessage", {
      from: userID,
      to: currentChat.userID,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'blob', // important
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={ContainerCSS.container}>
      <div className={ContainerCSS.header}>
        <span>
          {currentChat.firstname} {currentChat.lastname}
        </span>
      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.chatBox}>
        {messages.map((message, index) => (
          <div key={index} className={ContainerCSS.messagesContainer}>
            {message.fromSelf ? (
              <div className={ContainerCSS.sent}>
                <div className={ContainerCSS.textSent}>{message.message}</div>
              </div>
            ) : (
              <div className={ContainerCSS.received}>
                <div className={ContainerCSS.textReceived}>{message.message}</div>
                {message.fileUrl && (
                  <div className={ContainerCSS.downloadLink}>
                    <a href="#" onClick={() => downloadFile(message.fileUrl)}>
                      Download File
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className={ContainerCSS.line} />
      <div className={ContainerCSS.input}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};

export default ChatContainer;