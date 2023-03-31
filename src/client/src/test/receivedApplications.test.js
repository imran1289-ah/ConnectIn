import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ReceivedApplications from "../components/receivedApplicationsForRecruiters";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";

beforeAll(() => {
    sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
    sessionStorage.setItem("firstname", 'John');
    sessionStorage.setItem("lastname", 'Doe');
    sessionStorage.setItem("role", 'User');
  })


  test("jobsApplied page renders properly", () =>{
    
    render(<UserSession>
        <BrowserRouter>
            <ReceivedApplications/>
        </BrowserRouter>
    </UserSession>)

    const jobPostsDiv = screen.getByTestId("receivedApplications-test");
    expect(jobPostsDiv).toBeInTheDocument();


  })



afterAll(() => {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('role');
});