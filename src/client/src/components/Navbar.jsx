import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../css/navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const HandleSearch = () => {
    console.log(query);
    navigate(`/users/search?term=${query}`);
  };

  return (
    //Material UI navbar
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#19718D" }}>
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
                className="searchButton"
                type="submit"
                onClick={HandleSearch}
              >
                {" "}
                <SearchIcon> </SearchIcon>
              </button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
