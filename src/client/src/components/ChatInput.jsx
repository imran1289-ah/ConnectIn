import React, {useState} from "react";

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
    <form className="input-container" onSubmit={(e) => sendChat(e)}>
      <input
        type="text"
        placeholder="type your message here"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      /> 
      <input type="submit">
      </input>
    </form>
  </>
);
}

export default ChatInput;