import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Translation used for the testing purposes
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Please login to your account": "Please login to your account",  
      },
    },
    fr: {
      translation: {
        "Please login to your account":"Veuillez vous connecter à votre compte",
      },
    },
  },
  lng: "fr",
});

export default i18next;
