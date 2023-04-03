import React from "react";
import ViewJobsApplied from "../components/ViewJobsApplied";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";
sessionStorage.setItem("role", 'User');

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