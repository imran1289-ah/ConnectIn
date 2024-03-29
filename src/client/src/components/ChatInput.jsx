import { useState } from "react";
import React from "react";
import ChatInputCSS from "../css/ChatInput.module.css";
import { useTranslation } from "react-i18next";

const ChatInput = ({ handleSendMsg, from, to }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() || file) {
      handleSendMsg(message.trim(), file);
      setMessage("");
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={ChatInputCSS.chatbox}
        type="text"
        placeholder="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <label>
        <input type="file" onChange={handleChange} />
      </label>
      <button type="submit" className={ChatInputCSS.button}>
        {t("SEND")}
      </button>
    </form>
  );
};

export default ChatInput;
