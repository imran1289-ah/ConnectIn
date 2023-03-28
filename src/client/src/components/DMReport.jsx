import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/dmReports.css";

const DMReport = () => {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const {data} = await axios.get("http://localhost:9000/reports")
    console.log(data)
    setReports(data)
  }

  const navigate = useNavigate();

  const deleteReport = async (reportId) => {
    await axios.post(`/http://localhost:9000/reports/delete/${reportId}`)
    .then(response => {
      console.log(response.data);
      alert("Report successfully removed!");
      navigate("/dmReports")
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
              <button className="report-button-reject" type="button">Reject</button>
            </div>
            {/* <button type="button" onClick={deleteReport(`${report._id}`)}></button> */}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default DMReport;