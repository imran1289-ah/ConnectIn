import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PublicUserProfile = () => {
  //States
  const [publicUser, setPublicUser] = useState([]);

  //Get the search string from the user input
  let locationURL = useLocation().pathname;
  let profileId = useLocation().pathname.split("/")[3];

  //HTTP request to backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/users/profile/${profileId}`
        );
        setPublicUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [locationURL]);

  return (
    <div>
      {publicUser.firstname} {publicUser.lastname}
    </div>
  );
};

export default PublicUserProfile;
