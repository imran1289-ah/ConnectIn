import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchUser = () => {
  //States
  const [search, setSearch] = useState("");

  //Get the search string from the user input
  let locationURL = useLocation().search;

  //API call to backend

  return <div></div>;
};

export default SearchUser;
