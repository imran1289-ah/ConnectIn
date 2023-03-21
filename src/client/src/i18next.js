import i18next from "i18next";

import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Log in to your account": "Log in to your account",
        Email: "Email",
        password: "Password",
        "Sign Up": "Sign Up",
        logIn: "Log In",
        home: "Home",
        about: "About",
        donthave: "Dont Have an account ?",
        enteremail: "Enter your email",
        enterpassword: "Enter your password",
        "Login Sucess. Welcome Back": "Login Sucess. Welcome Back",
        "Incorrect Credentials Please try again":
          "Incorrect Credentials Please try again",
        "Create your account today!": "Create your account today!",
        "First Name": "First Name",
        "Enter Your First Name": "Enter Your First Name",
        "Last Name": "Last Name",
        "Enter Your Last Name": "Enter Your Last Name",
        "Account Type": "Account Type",
        User: "User",
        Recruiter: "Recruiter",
        Administrator: "Administrator",
        "Already have an account ?": "Already have an account ?",
        signuptext1:
          "Sign up today to connect with your boss, your colleagues, and your friends!",
        signuptext2:
          " We are the leading platform for networking and sharing your professional activities.",
        signuptext3:
          "Our mission is to help you to become more productive in your life.",
        signuptext4:
          "Social networking has never been easier with the help of our dedicated team of developers.",
        signuptext5:
          "Join us today and you won't regret it. We are like LinkedIn, but better!",
        "Successfully created an account!": "Successfully created an account!",
        "Failed to create an account!": "Failed to create an account!",
      },
    },
    fr: {
      translation: {
        "Log in to your account": "Connectez-vous à votre compte",
        Email: "Courriel",
        password: "Mot de passe",
        "Sign Up": "Inscire",
        logIn: "Connecter",
        home: "Accueil",
        about: "à propos",
        donthave: "Vous n'avez pas de compte ?",
        enteremail: "Entrer votre courriel",
        enterpassword: "Entrer votre mot de passe",
        "Login Sucess. Welcome Back":
          "Connexion réussie. Bienvenue à ConnectIn",
        "Incorrect Credentials Please try again":
          "Identifiants incorrects Veuillez réessayer",
        "Create your account today!": "Créez votre compte aujourd'hui !",
        "First Name": "Prénom",
        "Enter Your First Name": "Entrez votre prénom",
        "Last Name": "Last Name",
        "Enter Your Last Name": "Entrez votre nom de famille",
        "Account Type": "Type de compte",
        User: "Utilisateur",
        Recruiter: "Recruiteur",
        Administrator: "administrateur",
        "Already have an account ?": "Vous avez déjà un compte ?",
        signuptext1:
          "Inscrivez-vous dès aujourd'hui pour communiquer avec votre patron, vos collègues et vos amis !",
        signuptext2:
          "Nous sommes la première plateforme de mise en réseau et de partage de vos activités professionnelles..",
        signuptext3:
          "Notre mission est de vous aider à devenir plus productif dans votre vie.",
        signuptext4:
          "Le réseautage social n'a jamais été aussi facile avec l'aide de notre équipe de développeurs dévoués.",
        signuptext5:
          "Rejoignez-nous aujourd'hui et vous ne le regretterez pas. Nous sommes comme LinkedIn, mais en mieux !",
        "Successfully created an account!":
          "Un compte a été créé avec succès !",
        "Failed to create an account!": "Impossible de créer un compte !",
      },
    },
  },
  lng: "en",
});

export default i18next;
