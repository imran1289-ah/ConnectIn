import { useState } from "react";
import ChatInputCSS from "../css/ChatInput.module.css";
import axios from "axios";


const ChatInput = ({ handleSendMsg, from, to }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() || file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("message", message.trim());
      formData.append("from", from); 
      formData.append("to", to); 

      axios
        .post("http://localhost:9000/messages/addMessage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          handleSendMsg(message.trim());
          setMessage("");
          setFile(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        className={ChatInputCSS.chatbox}
        type="text"
        placeholder="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <label>
        <input  type="file" onChange={handleChange} />
      </label>
      <input className={ChatInputCSS.button} value="SEND" type="submit"></input>
    </form>
  );
};

export default ChatInput;