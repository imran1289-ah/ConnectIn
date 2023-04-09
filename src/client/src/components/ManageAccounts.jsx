import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../UserSession";
import { useContext } from "react";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../css/ManageAccounts.css";

const ManageAccouts = () => {
  const [accounts, setAccounts] = useState([]);
  const { t, i18n } = useTranslation();
  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      fetchSession();
    }
  }, []);

  //Having the loginState persist on all pages
  const fetchSession = async () => {
    try {
      if (userID) {
        setLogin({
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/admin/users`);
      console.log(userID);
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AdminAccounts">
      <h1 style={{ textAlign: "center" }}>{t("Manage Accounts")}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>{t("Email")}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{t("Edit")}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{t("Ban")}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{t("Unban")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell component="th" scope="row">
                  {account.email}
                </TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/manageAccounts/${account._id}`}
                    >
                      {t("Edit")}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error">
                    {t("Ban")}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    {t("Unban")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageAccouts;
