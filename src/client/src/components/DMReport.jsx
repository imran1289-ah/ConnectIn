import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DMReport = () => {

  const [reports, setReports] = useState([]);

  useEffect =(() => {
    fetchReports();
  }, [])

  const fetchReports = async () => {
    const data = await axios.get("http://localhost:9000/reports")
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
        {reports.map(report => {
          <div key={report._id} className="report">
            <p>{report.sender}</p>
            <p>{report.receiver}</p>
            <p>{report.reportedMessage}</p>
            <p>{report.justification}</p>
            <button onClick={deleteReport(`${report._id}`)}></button>
          </div>
        })}
        </div>
      </div>
    </div>
  )
}

export default DMReport;