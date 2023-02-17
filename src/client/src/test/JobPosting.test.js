import JobPosting from "../components/JobListing";
import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";


test("jobListing page renders properly", ()=>{
    render(<JobPosting/>);

    const fnameTextboxElement = screen.getByRole('textbok', {name:'fname'});
    const buttonElement =screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(fnameTextboxElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();


    
})