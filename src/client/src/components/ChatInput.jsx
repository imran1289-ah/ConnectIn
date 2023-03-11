import React, { useState } from "react";
import ChatInputCSS from "../css/ChatInput.module.css";

const ChatInput = ({ handleSendMsg }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0 || file) {
      handleSendMsg({ message, file });
      setMessage("");
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={(e) => sendChat(e)}>
        <input
          className={ChatInputCSS.chatbox}
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          className={ChatInputCSS.file}
          type="file"
          onChange={handleFileChange}
        />
        <input className={ChatInputCSS.button} value="SEND" type="submit" />
      </form>
    </>
  );
};

export default ChatInput;