import React, { useState, useEffect } from "react";
import "../css/editjobposting.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ReactDOM } from "react-dom";
import { useNavigate } from "react-router-dom";


function EditJobPosting() {

  const navigate = useNavigate();

  const [jobData, setjobData] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    axios.get("http://localhost:9000/jobs").then(response => {
      setjobData(response.data);
      console.log(response.data);
    });
  }

  const savePost = async e => {
    e.preventDefault();
    axios.post("http://localhost:9000/jobs", {
      job_id: jobData.job_id,
      title: jobData.title,
      description: jobData.description,
      salary: jobData.salary,
      category: jobData.category,
      location: jobData.location
    })
    .then(response => {
      console.log(response.data);
      alert("Update Successful!");
      // This should navigate back to the recruiter's 
      // job posting page
      // navigate("/UserProfile");
    })
    .catch(error => {
      console.log(error);
      alert("Update Failed! Please check the logs!");
    });
  };
  return (
    //Edit posting page
    <Container>
      <Row>
        <Col md={12}>
          <div className="WrapperEditPost">
            <h3 className="Title"> EDIT YOUR POSTING </h3>
            <form onSubmit={savePost}>
              <div className="FormEditPost">
                <label className="PlaceholderEditPost">
                  Title {" "}
                  <br></br>
                  <input
                    aria-label="jobtitle"
                    className="Input"
                    name="jobtitle"
                    value={jobData.title}
                    pattern="[a-zA-Z\s]+"
                    onChange={e =>
                      setjobData({
                        ...jobData,
                        title: e.target.value
                      })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>

                <label className="PlaceholderEditPost">
                  Description {" "}
                  <br></br>
                  <input className="InputJobDescription" name="jobdescription" value={jobData.description} onChange={e => setjobData({ ...jobData, description: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>

                <label className="PlaceholderEditPost">
                  Annual Pay {" "}
                  <br></br>
                  <input className="Input" name="salary" type="number" pattern="\d+" value={jobData.salary} onChange={e => setjobData({ ...jobData, salary: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <label className="PlaceholderEditPost">
                  Full-Time/Part-Time {" "}
                  <br></br>
                  <input className="Input" name="category" value={jobData.category} onChange={e => setjobData({ ...jobData, category: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <label className="PlaceholderEditPost">
                  Location {" "}
                  <br></br>
                  <input className="Input" name="worklocation" value={jobData.location} onChange={e => setjobData({ ...jobData, location: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit" className="SaveButton">
                  Save {" "}
                </button>
              </div>
              <br></br>
              <br></br>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditJobPosting;
