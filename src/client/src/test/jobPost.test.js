import { render, screen, fireEvent } from "@testing-library/react";
import JobPosting from "../components/JobPosting";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import UserSession from "../UserSession";

beforeAll(() => {
  sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
  sessionStorage.setItem("firstname", 'Tim');
  sessionStorage.setItem("lastname", 'Cook');
  sessionStorage.setItem("role", 'Recruiter');
})

jest.mock("axios");

describe("JobPosting", () => {
  it("should create a job when button is clicked", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ data: { message: "Job created" } })
    );
    render(<UserSession><BrowserRouter><JobPosting /></BrowserRouter></UserSession>);
    const titleInput = screen.getByLabelText("Job Title");
    fireEvent.change(titleInput, { target: { value: "Software Engineer" } });
    const companyInput = screen.getByLabelText("Company");
    fireEvent.change(companyInput, { target: { value: "Google" } });
    const descriptionInput = screen.getByLabelText("Job Description");
    fireEvent.change(descriptionInput, { target: { value: "Write code" } });
    const salaryInput = screen.getByLabelText("Salary/Pay");
    fireEvent.change(salaryInput, { target: { value: "100000" } });
    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, {
      target: { value: "Software Development" },
    });
    const locationInput = screen.getByLabelText("Location");
    fireEvent.change(locationInput, { target: { value: "New York" } });
    const button = screen.getByRole("button", { name: /Post\/Save/i });
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:9000/jobs/create",
      {
        job_id: expect.any(Number),
        title: "Software Engineer",
        company: "Google",
        description: "Write code",
        salary: "100000",
        category: "Software Development",
        location: "New York",
      }
    );
  });
});

afterAll(() => {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('role');
});
