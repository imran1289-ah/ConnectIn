import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import JobApplication from '../components/JobApplication'
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";


test("jobApplication page renders properly", ()=>{
    render(<UserSession>
            <BrowserRouter>
            <JobApplication/>
            </BrowserRouter>
            </UserSession>);

    const jobAppsDiv = screen.getByTestId('JAPage');
    expect(jobAppsDiv).toBeInTheDocument();

})