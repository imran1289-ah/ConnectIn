import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../css/navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Icon } from "@mui/material";

const navbar = () => {
  return (
    //Material UI navbar
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="navbar"
        style={{ background: "#0077b5" }}
      >
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <span className="WebLogo">ConnectIn</span>
            <button className="Icon">
              <HomeOutlinedIcon></HomeOutlinedIcon>
            </button>
            <button className="Icon">
              <InfoOutlinedIcon></InfoOutlinedIcon>
            </button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default navbar;
