import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ViewJobsApplied from "../components/ViewJobsApplied";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";

beforeAll(() => {
    sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
    sessionStorage.setItem("firstname", 'John');
    sessionStorage.setItem("lastname", 'Doe');
    sessionStorage.setItem("role", 'User');
  })

  //data-testid=

  test("jobsApplied page randers properly", () =>{
    
    render(<UserSession>
        <BrowserRouter>
            <ViewJobsApplied/>
        </BrowserRouter>
    </UserSession>)

    const jobsAppliedDiv = screen.getByTestId("jobsApplied-test");
    expect(jobsAppliedDiv).toBeInTheDocument();


  })



  afterAll(() => {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('role');
});