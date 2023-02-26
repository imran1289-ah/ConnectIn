import React, { useState } from "react";

const initialState = {
  email: "",
  firstname: "",
  lastname: "",
  user_id: "",
  isLoggedIn: false,
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [login, setLogin] = useState(initialState);

  return (
    <Context.Provider value={[login, setLogin]}>{children}</Context.Provider>
  );
};

export default Store;
