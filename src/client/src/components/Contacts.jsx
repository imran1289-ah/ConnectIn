import React, {useState} from "react";
import ContactCSS from "../css/Contacts.module.css";
import Avatar from '@mui/material/Avatar'

const Contacts = ({connections, changeChat}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

    const changeCurrentChat = (index, contact) => {
      console.log(index);
      console.log(contact);
      setCurrentSelected(index)
      changeChat(contact)
    }
    const [loadChat, setLoadChat] = useState(false);
    
    const loadChatComponent = () => {
      setLoadChat(true);
    }

    return(
        <div className={ContactCSS.contacts}>
            <h2 className="mycontact">My Contacts</h2>
            <div className="ul">
             {connections && (connections.map((contact, index) => {
               return (
                
                 <div key={contact._id} className={ContactCSS.connectionInfo} onClick={() => changeCurrentChat(index, contact)}>
                   {/* <img className={ContactCSS.contactImage}
                     src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                     alt="comapnyPic"
                   /> */}
                   <Avatar alt="Logo" src="./logo/logo.png" size="medium"sx={{ width: 75, height: 75 }}/>

                   

                    <span className={ContactCSS.connectionName}>{contact.firstname} {contact.lastname}</span>

                 </div>
               );
             }))}
           </div>
        </div>
    )
}

export default Contacts;