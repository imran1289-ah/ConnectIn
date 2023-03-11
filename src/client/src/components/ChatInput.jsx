import React, {useState} from "react";
import ChatInputCSS from "../css/ChatInput.module.css"

const ChatInput = ({ handleSendMsg }) => {
  const [message, setMessage] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  }

return(
  <>
    <form onSubmit={(e) => sendChat(e)}>
      <input
        className={ChatInputCSS.chatbox}
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <input className={ChatInputCSS.button} value="SEND" type="submit"></input>
    </form>
  </>
);
}

export default ChatInput;