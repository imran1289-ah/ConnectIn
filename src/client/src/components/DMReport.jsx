import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../UserSession";
import "../css/dmReports.css";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

const DMReport = () => {
  const [reports, setReports] = useState([]);
  const userID = sessionStorage.getItem("userID");
  const userRole = sessionStorage.getItem("role");
  const [login, setLogin] = useContext(Context);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchReports();
    fetchSession();
  }, []);

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

  const fetchReports = async () => {
    const { data } = await axios.get("https://connectin-api.onrender.com/reports");
    console.log(data);
    setReports(data);
  };

  const deleteReport = async (reportId) => {
    console.log(reportId);
    await axios
      .delete(`https://connectin-api.onrender.com/reports/delete`, {
        data: {
          id: reportId,
        },
      })
      .then((response) => {
        console.log(response.data);
        swal(
          t("Congrats!"),
          t("You have successfully resolved the report!"),
          "success",
          {
            button: false,
            timer: 1000,
          }
        ).then((response) => {
          setTimeout(function () {
            window.location.reload();
          }, 600);
        });
      })
      .catch((err) => {
        console.log(err);
        swal(t("Error"), t("Failed to resolve the report"), "error", {
          button: false,
          timer: 1000,
        });
      });
  };

  const ban = async (senderID, reportId) => {
    axios
      .post(`https://connectin-api.onrender.com/admin/ban/${senderID}`, {
        isBan: true,
      })
      .then((response) => {
        console.log(response.data);
        console.log(reportId);
        deleteReport(reportId);
      })
      .catch((error) => {
        console.log(error);
        swal(t("Failed!"), t("Cannot update the user"), "error", {
          button: false,
          timer: 2000,
        });
      });
  };

  if (userID && userRole === "Administrator") {
    return (
      <div>
        <div className="dm-reports-container">
          <div className="heading">
            <b>{t("DM Reports")}</b>
          </div>
          <div className="dm-reports">
            {reports.map((report) => (
              <div key={report._id} className="report">
                <p>
                  <span style={{ fontWeight: "bold" }}>{t("Sender")}: </span>
                  {report.sender}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>{t("Receiver")}: </span>
                  {report.receiver}
                </p>
                {(report.reportedDM.props === undefined ? (
                  <p>
                    <span style={{ fontWeight: "bold" }}>{t("Message")}: </span>
                    {report.reportedDM}
                  </p>
                ) : (
                  <p>
                    <span style={{ fontWeight: "bold" }}>{t("Message")}: </span>
                    <a href={report.reportedDM.props.href}>{report.reportedDM.props.children}</a>
                  </p>
                ))}
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {t("Justification")}:{" "}
                  </span>
                  {report.justification}
                </p>
                <div className="report-button-bundle">
                  <button
                    className="report-button-accept"
                    type="button"
                    onClick={() => ban(`${report.sender}`, `${report._id}`)}
                  >
                    {t("Ban")}
                  </button>
                  <button
                    className="report-button-reject"
                    onClick={() => deleteReport(`${report._id}`)}
                  >
                    {t("Reject")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1 style={{ textAlign: "center" }}>
        You need to be administrator to manage reports
      </h1>
    );
  }
};

export default DMReport;
