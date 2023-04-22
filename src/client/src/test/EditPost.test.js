/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditJobPosting from "../components/EditJobPosting";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";

beforeAll(() => {
  sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
  sessionStorage.setItem("firstname", 'John');
  sessionStorage.setItem("lastname", 'Doe');
  sessionStorage.setItem("role", 'Administrator');
})

test("page renders properly", () => {
  render(
    <UserSession>
      <MemoryRouter initialEntries={['/jobs/54321']}>
        <EditJobPosting />
      </MemoryRouter>
    </UserSession>

  );
  const heading = screen.getByRole("heading", { level: 3 });
  const title = screen.getByText(/Title/i);
  const description = screen.getByText(/Description/i);
  const annualPay = screen.getByText(/Salary/i);
  const location = screen.getByText(/Location/i);
  expect(heading).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(annualPay).toBeInTheDocument();
  expect(location).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('role');
});
