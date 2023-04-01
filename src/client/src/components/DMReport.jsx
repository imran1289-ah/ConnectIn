import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../UserSession";
import "../css/dmReports.css";
import swal from "sweetalert";

const DMReport = () => {

  const [reports, setReports] = useState([]);
  const userID = sessionStorage.getItem("userID");
  const [login, setLogin] = useContext(Context);

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
    const {data} = await axios.get("http://localhost:9000/reports")
    console.log(data)
    setReports(data)
  }

  const deleteReport = async (reportId) => {
    console.log(reportId);
    await axios.delete(`http://localhost:9000/reports/delete`, {
      data: {
        "id": reportId
      }
    })
    .then(response => {
      console.log(response.data);
      swal("Congrats!", "You have successfully resolved a report!", "success", {
        button: false,
        timer: 1000,
      })
      .then((response) => {
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      })
    })
    .catch(err => {
      console.log(err);
      alert("Failed report removal");
    })
  }

  return (
    <div>
      <div className="dm-reports-container">
        <div className="heading">
          <b>DM Reports</b>
        </div>
        <div className="dm-reports">
        {reports.map(report => (
          <div key={report._id} className="report">
            <p><span style={{fontWeight: "bold"}}>Sender: </span>{report.sender}</p>
            <p><span style={{fontWeight: "bold"}}>Receiver: </span>{report.receiver}</p>
            <p><span style={{fontWeight: "bold"}}>Message: </span>{report.reportedDM}</p>
            <p><span style={{fontWeight: "bold"}}>Justification: </span>{report.justification}</p>
            <div className="report-button-bundle">
              <button className="report-button-accept" type="button">Accept</button>
              <button className="report-button-reject" onClick={() => deleteReport(`${report._id}`)}>Reject</button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default DMReport;