import React from "react";
import LoginFooterCSS from "../css/loginfooter.module.css";

const Footer = () => {
  return (
    // Footer of the page
    <div className={LoginFooterCSS.FooterLine}>
      <div className={LoginFooterCSS.Info}>
        Home | About | Languages
        <br></br>
        ConnectIn @2023
      </div>
    </div>
  );
};

export default Footer;
