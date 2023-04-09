import React, { useState, useContext, useEffect } from "react";
import "../css/AdminEditAccount.css";
import { Context } from "../UserSession";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextField } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

function AdminEditAccount() {
  const navigate = useNavigate();
  let locationURL = useLocation().pathname;
  let accountId = locationURL.split("/")[2];
  const { t, i18n } = useTranslation();

  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");
  const userRole = sessionStorage.getItem("role");

  const [accountData, setaccountData] = useState([]);

  useEffect(() => {
    if (userID) {
      fetchSession();
    }
    // if (userRole !== "User") {
    //   fetchData();
    // }
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

  const editAccount = async (e) => {
    e.preventDefault();
    console.log(accountId);
    axios
      .post(`http://localhost:9000/admin/edit/${accountId}`, {
        email: accountData.email,
        password: accountData.password,
        role: accountData.role,
      })
      .then((response) => {
        console.log(response.data);
        swal(t("Saved!"), t("Successfully updated the user"), "success", {
          button: false,
          timer: 2000,
        });
        navigate("/manageAccounts");
      })
      .catch((error) => {
        console.log(error);
        swal(t("Failed!"), t("Cannot update the user"), "error", {
          button: false,
          timer: 2000,
        });
      });
  };

  if (userID && userRole === "Administrator" && (userID !== accountId)) {
    return (
      //Edit posting page
      <Container id="AdmineditAccountcontainer">
        <Row>
          <Col md={12}>
            <div className="AdminWrapperEditPost">
              <h3 className="AdminTitle"> {t("Edit Account")}</h3>
              <form onSubmit={editAccount}>
                <div className="AdminFormEditPost">
                  <label className="AdminPlaceholderEditPost">
                    {t("Email")}
                  </label>
                  <br></br>
                  <TextField
                    sx={{ width: { sm: 400, md: 600 } }}
                    fullWidth
                    className="AdmineditInput"
                    id="account_email"
                    value={accountData.email}
                    variant="outlined"
                    pattern="[a-zA-Z\s]+"
                    onChange={(e) =>
                      setaccountData({
                        ...accountData,
                        email: e.target.value,
                      })
                    }
                  />
                  <br></br>
                  <br></br>
                  <label className="AdminPlaceholderEditPost">
                    {t("password")}
                  </label>
                  <br></br>
                  <TextField
                    sx={{ width: { sm: 400, md: 600 } }}
                    fullWidth
                    className="AdmineditInput"
                    id="account_password"
                    type="password"
                    value={accountData.password}
                    variant="outlined"
                    pattern="[a-zA-Z\s]+"
                    onChange={(e) =>
                      setaccountData({
                        ...accountData,
                        password: e.target.value,
                      })
                    }
                  />
                  <br></br>
                  <br></br>
                  <label className="AdminPlaceholderEditPost">Role</label>
                  <br></br>
                  <label className="AdminPlaceholderSignup">
                    <br />
                    <Select
                      required
                      id="select"
                      value={accountData.role}
                      sx={{
                        width: 300,
                        height: 50,
                      }}
                      onChange={(e) =>
                        setaccountData({ ...accountData, role: e.target.value })
                      }
                    >
                      <MenuItem value={"User"}>{t("User")}</MenuItem>
                      <MenuItem value={"Recruiter"}>{t("Recruiter")}</MenuItem>
                      <MenuItem value={"Administrator"}>
                        {t("Administrator")}
                      </MenuItem>
                    </Select>
                  </label>

                  <br></br>
                  <br></br>
                  <br></br>
                  <button type="submit" className="AdminSaveButton">
                    {t("Save changes")}{" "}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container id="editPostcontainer">
        <br />
        <h1 style={{ textAlign: "center" }}>
          You need to be administrator to edit account!
        </h1>
      </Container>
    );
  }
}

export default AdminEditAccount;
