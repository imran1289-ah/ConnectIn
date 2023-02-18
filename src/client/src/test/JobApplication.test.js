import JobApplication from "../components/JobApplication";
import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("jobListing page renders properly", ()=>{
    render(<BrowserRouter><JobApplication/></BrowserRouter>);

    const fnameTextboxElement = screen.getByTestId("fname-textbox");
    const buttonElement =screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(fnameTextboxElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();


    
})