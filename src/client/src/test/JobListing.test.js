import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import JobListing from "../components/JobListing";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";


test("jobListing page renders properly", ()=>{
    render(<UserSession><BrowserRouter><JobListing/></BrowserRouter></UserSession>);

    const jobPostsDiv = screen.getByTestId("jobPostsContainer");
    expect(jobPostsDiv).toBeInTheDocument();

})