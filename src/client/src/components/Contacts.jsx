import React, { useState } from "react";
import ContactCSS from "../css/Contacts.module.css";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";

const Contacts = ({ connections, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    // console.log(index);
    // console.log(contact);
    setCurrentSelected(index);
    changeChat(contact);
  };
  const [loadChat, setLoadChat] = useState(false);

  const loadChatComponent = () => {
    setLoadChat(true);
  };

  const { t, i18n } = useTranslation();

  return (
    <div className={ContactCSS.contacts}>
      <div className={ContactCSS.header}>{t("My Contacts")}</div>
      <hr className={ContactCSS.line} />
      <div className="ul">
        {connections &&
          connections.map((contact, index) => {
            return (
              <>
                <div
                  key={contact.userID}
                  className={ContactCSS.connectionInfo}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {/* {console.log(connections)} */}
                  {/* <img className={ContactCSS.contactImage}
                     src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                     alt="comapnyPic"
                   /> */}
                  <Avatar
                  className="Avatar"
                    alt="Logo"
                    src="./logo/logo.png"
                    size="medium"
                  />
                  <span className={ContactCSS.connectionName}>
                    {contact.firstname} {contact.lastname}
                  </span>
                </div>
                <hr className={ContactCSS.line} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
