import React from "react";
import ReceivedApplications from "../components/receivedApplicationsForRecruiters";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
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