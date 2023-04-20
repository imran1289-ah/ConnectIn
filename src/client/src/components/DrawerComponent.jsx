import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Context } from "../UserSession";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

const DrawerComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();
  const userRole = sessionStorage.getItem("role");

  //Get id of logged in user
  const role = sessionStorage.getItem("role");

  const HandleSearch = () => {
    console.log(query);
    navigate(`/users/search?term=${query}`);
  };

  const handleLogout = async () => {
    navigate("/signin");
    await axios.post("https://connectin-api.onrender.com/session/logout").then((response) => {
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
  };

  const redirectJobs = () => {
    navigate("/jobs");
  };

  const redirectHome = () => {
    navigate("/userTimeline");
  };

  const redirectWaitingConnections = () => {
    navigate("/waitingConnections");
  };

  const redirectDMReports = () => {
    navigate("/dmReports");
  };

  const redirectJobApplications = () => {
    navigate("/jobsapplied");
  };

  const redirectReceivedApplications = () => {
    navigate("/receivedApplications");
  };
  const redirectJobPosting = () => {
    navigate("/jobposting");
  };
  const redirectJobListing = () => {
    navigate("/JobList");
  };

  return (
    <>
      <Drawer anchor="right" onClose={() => setOpenMenu(false)} open={openMenu}>
        <List>
          <ListItem>
            <ListItemText>
              <input
                style={{ width: "200px", height: "30px" }}
                onChange={(e) => setQuery(e.target.value)}
              ></input>
              <button onClick={HandleSearch}>
                <SearchIcon fontSize="small"> </SearchIcon>
              </button>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectHome}>
                {t("home")}
              </IconButton>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectWaitingConnections}>
                {t("Network")}
              </IconButton>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectJobs}>
                {t("Jobs")}
              </IconButton>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectJobApplications}>
                {t("Jobs Applied")}
              </IconButton>
            </ListItemText>
          </ListItem>

          {userRole === "Recruiter" || userRole === "Administrator" ? (
            <ListItem>
              <ListItemText>
                <IconButton
                  color="inherit"
                  onClick={redirectReceivedApplications}
                >
                  {t("Applicants")}
                </IconButton>
              </ListItemText>
            </ListItem>
          ) : (
            <></>
          )}
          {userRole === "Recruiter" || userRole === "Administrator" ? (
            <ListItem>
              <ListItemText>
                <IconButton color="inherit" onClick={redirectJobPosting}>
                  {t("Post Job")}
                </IconButton>
              </ListItemText>
            </ListItem>
          ) : (
            <></>
          )}
          {userRole === "Recruiter" || userRole === "Administrator" ? (
            <ListItem>
              <ListItemText>
                <IconButton color="inherit" onClick={redirectJobListing}>
                {t("My Jobs")}
                </IconButton>
              </ListItemText>
            </ListItem>
          ) : (
            <></>
          )}

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectMessages}>
                Messages
              </IconButton>
            </ListItemText>
          </ListItem>

          {/* {role == "Administrator" &&
              <IconButton color="inherit" onClick={redirectDMReports}>
                <Box className="parentUserIconContainer">
                  <Typography className="userIconContainer">
                    <FlagIcon
                      className="publicUserIcon"
                      fontSize="large"
                    ></FlagIcon>
                    <Typography
                      fontSize={10}
                      className="userSubtitle"
                      variant="subtitle2"
                    >
                      DM Reports
                    </Typography>
                  </Typography>
                </Box>
              </IconButton>
            } */}

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={redirectProfile}>
                {t("Profile")}
              </IconButton>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <IconButton color="inherit" onClick={handleLogout}>
                {t("Sign Out")}
              </IconButton>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#19718D" }}>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <span className="WebLogo">ConnectIn</span>
            </Typography>

            {sessionStorage.getItem("userID") ? (
              <>
                {" "}
                <IconButton
                  style={{ marginLeft: "auto" }}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <MenuIcon></MenuIcon>
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default DrawerComponent;
