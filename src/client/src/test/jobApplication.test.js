import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import JobApplication from '../components/JobApplication'
import '@testing-library/jest-dom';
import axios from "axios";
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import UserSession from "../UserSession";

let job;
let userID;
let recruiterID;

beforeAll(() => {
    sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
    sessionStorage.setItem("firstname", 'John');
    sessionStorage.setItem("lastname", 'Doe');
    sessionStorage.setItem("role", 'User');
    userID = sessionStorage.getItem('userID');
    recruiterID = 'asdkjqlk2jelksjakdsa';
    job = {
      jobState: {
        "_id": "6410bf5f9ebfb9f5b8151607",
        "job_id": 54321,
        "description": "This is a changed description 333",
        "salary": 12345,
        "company": "InConnect",
        "category": "Full-Time",
        "title": "Changed Title",
        "location": "Part-Time",
      }
    };
  })

jest.mock("axios");

test("Job Applications page functions as expected", async ()=> {

  axios.get.mockImplementation((url) => {
    switch(url) {
      case `http://localhost:9000/users/${userID}/jobsApplied`:
        return Promise.resolve({data: []});
      case `http://localhost:9000/users/${recruiterID}/receivedApplications`:
        return Promise.resolve({data: []});
    }
  })

  axios.post.mockImplementation((url) => {
    switch(url) {
      case `http://localhost:9000/users/${recruiterID}/receivedApplications`:
        return Promise.resolve({data: [{message: "Succesfully received application!"}]});
      case `http://localhost:9000/users/${userID}/jobsApplied`:
        return Promise.resolve({data: [{message: "Succesfully submitted application!"}]});
      case `http://localhost:9000/resume/uploadResume/${userID}`:
        return Promise.resolve({data: [{message: "Succesfully submitted resume!"}]});
      case `http://localhost:9000/resume/uploadCoverLetter/${userID}`:
        return Promise.resolve({data: [{message: "Succesfully submitted cover letter!"}]});
    }
  });

  const resumefile = new File(['Hello there.'], 'hello.pdf', { type: 'application/pdf' });
  const cvFile = new File(['Never Gonna Give You Up!'], 'cv.pdf', { type: 'application/pdf' });

    render(
      <UserSession>
        <MemoryRouter initialEntries={[{state: job}]}>
          <JobApplication />
        </MemoryRouter>
      </UserSession>
    );

    const jobAppsDiv = screen.getByTestId('JAPage');
    expect(jobAppsDiv).toBeInTheDocument();

    const fname = screen.getByRole('textbox', {name: "First Name"});
    fireEvent.change(fname, {target: {value: 'John'}});
    expect(fname.value).toBe('John');

    const lname = screen.getByRole('textbox', {name: "Last Name"});
    fireEvent.change(lname, {target: {value: 'Doe'}});

    const email = screen.getByRole('textbox', {name: "Email"});
    fireEvent.change(email, {target: {value: 'j.d@email.com'}});

    const phone = screen.getByRole('textbox', {name: "Phone Number"});
    fireEvent.change(phone, {target: {value: '1234567890'}});

    const resumeInput = screen.getByLabelText(/Resume/i)
    expect(resumeInput).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.change(resumeInput, {
        target: { files: [resumefile] },
      })
    );

    const cvInput = screen.getByLabelText(/Cover Letter/i)
    expect(cvInput).toBeInTheDocument();
    
    await waitFor(() =>
      fireEvent.change(cvInput, {
        target: { files: [cvFile] },
      })
    );

    expect(fname).toBeInTheDocument();
    expect(lname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(resumeInput.files).toHaveLength(1)
    expect(cvInput.files).toHaveLength(1)

    const submitButton = screen.getByTestId("submitButton")
    fireEvent.click(submitButton);

})

test("User must complete the form before proceeding", async () => {
  axios.get.mockImplementation((url) => {
    switch(url) {
      case `http://localhost:9000/users/${userID}/jobsApplied`:
        return Promise.resolve({data: []});
      case `http://localhost:9000/users/${recruiterID}/receivedApplications`:
        return Promise.resolve({data: []});
    }
  })

  axios.post.mockImplementation((url) => {
    switch(url) {
      case `http://localhost:9000/users/${recruiterID}/receivedApplications`:
        return Promise.resolve({data: [{message: "Succesfully received application!"}]});
      case `http://localhost:9000/users/${userID}/jobsApplied`:
        return Promise.resolve({data: [{message: "Succesfully submitted application!"}]});
      case `http://localhost:9000/resume/uploadResume/${userID}`:
        return Promise.resolve({data: [{message: "Succesfully submitted resume!"}]});
      case `http://localhost:9000/resume/uploadCoverLetter/${userID}`:
        return Promise.resolve({data: [{message: "Succesfully submitted cover letter!"}]});
    }
  });

  const resumefile = new File(['Hello there.'], 'hello.pdf', { type: 'application/pdf' });
  const cvFile = new File(['Never Gonna Give You Up!'], 'cv.pdf', { type: 'application/pdf' });

    render(
      <UserSession>
        <MemoryRouter initialEntries={[{state: job}]}>
          <JobApplication />
        </MemoryRouter>
      </UserSession>
    );

    const fname = screen.getByRole('textbox', {name: "First Name"});
    fireEvent.change(fname, {target: {value: 'John'}});
    expect(fname.value).toBe('John');

    const lname = screen.getByRole('textbox', {name: "Last Name"});
    fireEvent.change(lname, {target: {value: 'Doe'}});

    const email = screen.getByRole('textbox', {name: "Email"});
    fireEvent.change(email, {target: {value: 'j.d@email.com'}});

    const resumeInput = screen.getByLabelText(/Resume/i)
    expect(resumeInput).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.change(resumeInput, {
        target: { files: [resumefile] },
      })
    );

    const cvInput = screen.getByLabelText(/Cover Letter/i)
    expect(cvInput).toBeInTheDocument();
    
    await waitFor(() =>
      fireEvent.change(cvInput, {
        target: { files: [cvFile] },
      })
    );

    expect(fname).toBeInTheDocument();
    expect(lname).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    expect(resumeInput.files).toHaveLength(1)
    expect(cvInput.files).toHaveLength(1)

    const submitButton = screen.getByTestId("submitButton")
    fireEvent.click(submitButton);
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:9000/users/${userID}/jobsApplied`
    )
})

afterAll(() => {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('role');
});