import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import JobListing from "../components/JobListing";
import '@testing-library/jest-dom';


test("jobListing page renders properly", ()=>{
    render(<JobListing/>);

    const jobPostsDiv = screen.getByTestId("jobPostsContainer");
    expect(jobPostsDiv).toBeInTheDocument();


    
})