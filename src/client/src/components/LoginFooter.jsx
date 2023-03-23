import React from "react";
import "../css/loginfooter.css";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    // Footer of the page
    <div className="FooterLine">
      <div className="Info">
        {t("home")} | {t("about")} |
        <button
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </button>
        |
        <button
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
          onClick={() => i18n.changeLanguage("fr")}
        >
          French
        </button>
        <br></br>
        ConnectIn @2023
      </div>
    </div>
  );
};

export default Footer;
