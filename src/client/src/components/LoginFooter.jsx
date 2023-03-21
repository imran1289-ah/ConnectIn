import React from "react";
import "../css/loginfooter.css";

const Footer = () => {
  const [language, setLanguage] = React.useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    // Footer of the page
    <div className="FooterLine">
      <div className="Info">
        Home | About |
        <select>
          <option value="en" onChange={handleChange}>
            English
          </option>
          <option value="fr" onChange={handleChange}>
            French
          </option>
        </select>
        <br></br>
        ConnectIn @2023
      </div>
    </div>
  );
};

export default Footer;
