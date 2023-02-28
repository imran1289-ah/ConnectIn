import React, { useState } from "react";

const initialState = {
  isLoggedIn: false,
};

export const Context = React.createContext();

const UserSession = ({ children }) => {
  const [login, setLogin] = useState(initialState);

  return (
    <Context.Provider value={[login, setLogin]}>{children}</Context.Provider>
  );
};

export default UserSession;
