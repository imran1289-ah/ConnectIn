import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import MessageIcon from "@mui/icons-material/Message";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import { fontSize } from "@mui/system";
import { Context } from "../UserSession";
import axios from "axios";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useContext(Context);

  const HandleSearch = () => {
    console.log(query);
    navigate(`/users/search?term=${query}`);
  };

  const handleLogout = async () => {
    navigate("/signin");
    await axios.post("session/logout").then((response) => {
      console.log(response.data);

      setLogin({
        isLoggedIn: false,
      });
    });
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("firstname");
    sessionStorage.removeItem("lastname");
    sessionStorage.removeItem("role");
  };

  const redirectProfile = () => {
    navigate("/userProfile");
  };

  const redirectMessages = () => {
    navigate("/chat");
  }

  const redirectJobs = () => {
    navigate("/jobs")
  }

  const redirectHome = () => {
    navigate("/userTimeline");
  };

  const redirectWaitingConnections = () =>{
    navigate("/waitingConnections")
  }

  return (
    //Material UI navbar
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#19718D" }}>
        {login.isLoggedIn ? (
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <span className="WebLogo">ConnectIn</span>
            </Typography>

            <div className="searchArea">
              <Typography>
                {" "}
                <input
                  className="searchInput"
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button
                  className="IconButton"
                  type="submit"
                  onClick={HandleSearch}
                >
                  {" "}
                  <SearchIcon> </SearchIcon>
                </button>
              </Typography>
            </div>
            <div className="userButtons">
              <IconButton color="inherit" onClick={redirectHome}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <HomeIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></HomeIcon>

                    <Typography fontSize={10} variant="subtitle2">
                      Home
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>

              <IconButton color="inherit" onClick={redirectWaitingConnections}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <GroupIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></GroupIcon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      Network
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>

              <IconButton color="inherit" onClick={redirectJobs}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <WorkIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></WorkIcon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      Jobs
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>

              <IconButton color="inherit" onClick={redirectMessages}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <MessageIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></MessageIcon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      Messages
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>

              <IconButton color="inherit" onClick={redirectProfile}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <Person2Icon
                      className="publicUserIcon"
                      fontSize="large"
                    ></Person2Icon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      Profile
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>

              <IconButton color="inherit" onClick={handleLogout}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <LogoutIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></LogoutIcon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      Sign Out
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>
            </div>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <span className="WebLogo">ConnectIn</span>
            </Typography>{" "}
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

export default Navbar;
