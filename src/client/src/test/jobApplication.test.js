import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import JobApplication from '../components/JobApplication'
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import UserSession from "../UserSession";

beforeAll(() => {
    sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
    sessionStorage.setItem("firstname", 'John');
    sessionStorage.setItem("lastname", 'Doe');
    sessionStorage.setItem("role", 'User');
  })


//  const jobState=  {
//     "_id": "641b3aaef44663964076dec6",
//     "job_id": 640681,
//     "recruiter_id": "641b3966f44663964076dec0",
//     "description": "aa",
//     "salary": 21,
//     "company": "aaa",
//     "category": "Full-Time",
//     "title": "aa",
//     "location": "aa",
//     "work_type": "onSite",
//     "__v": 0
// }
test("jobApplication page renders properly", ()=>{
    render(<UserSession>
            <MemoryRouter initialEntries={['/jobs/54321']}>
                <JobApplication />
            </MemoryRouter>
            </UserSession>);

    const jobAppsDiv = screen.getByTestId('JAPage');
    expect(jobAppsDiv).toBeInTheDocument();

})

afterAll(() => {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('role');
  });
  