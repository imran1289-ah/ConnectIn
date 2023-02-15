import React, { useState, useEffect } from "react";
import "../css/editjobposting.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

function EditJobPosting() {
  const [jobData, setjobData] = useState({
    jobtitle: "",
    jobdescription: "",
    annualpay: 0,
    employeetype: "",
    worklocation: ""
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  function fetchPosts(e) {
    e.preventDefault();
    axios.get("http://localhost:9000/jobs/:job_id").then(response => {
      setjobData({
        jobtitle: response.data.jobtitle,
        jobdescription: response.data.jobdescription,
        annualpay: response.data.annualpay,
        employeetype: response.data.employeetype,
        worklocation: response.data.worklocation
      });
    });
  }

  function savePost(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/jobs/:job_id", {
      jobtitle: jobData.jobtitle,
      jobdescription: jobData.jobdescription,
      annualpay: jobData.annualpay,
      employeetype: jobData.employeetype,
      worklocation: jobData.worklocation
    });
  }

  return (
    //Edit posting page
    <Container>
      <Row>
        <Col md={12}>
          <div className="WrapperEditPost">
            <h3 className="Title"> EDIT YOUR POSTING </h3>
            <form>
              <div className="FormEditPost">
                <label className="PlaceholderEditPost">
                  Title
                  <br></br>
                  <input
                    aria-label="jobtitle"
                    className="Input"
                    name="jobtitle"
                    value={jobData.jobtitle}
                    onChange={e =>
                      setjobData({
                        ...jobData,
                        jobtitle: e.target.value
                      })
                    }
                  ></input>
                </label>
                <br></br>
                <br></br>

                <label className="PlaceholderEditPost">
                  Description
                  <br></br>
                  <input className="InputJobDescription" name="jobdescription" value={jobData.jobdescription} onChange={e => setjobData({ ...jobData, jobdescription: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>

                <label className="PlaceholderEditPost">
                  Annual Pay
                  <br></br>
                  <input className="Input" name="annualpay" type="number" value={jobData.annualpay} onChange={e => setjobData({ ...jobData, annualpay: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <label className="PlaceholderEditPost">
                  Full-Time/Part-Time
                  <br></br>
                  <input className="Input" name="employeetype" value={jobData.employeetype} onChange={e => setjobData({ ...jobData, employeetype: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <label className="PlaceholderEditPost">
                  Location
                  <br></br>
                  <input className="Input" name="worklocation" value={jobData.worklocation} onChange={e => setjobData({ ...jobData, worklocation: e.target.value })}></input>
                </label>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <button onClick={savePost} className="SaveButton">
                  Save
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
