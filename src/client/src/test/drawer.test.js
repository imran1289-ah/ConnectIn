import React from "react";
import Drawer from "../components/DrawerComponent";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";

beforeAll(() => {
  sessionStorage.setItem("userID", "6410a8bd165eca75f68ba375");
  sessionStorage.setItem("firstname", "John");
  sessionStorage.setItem("lastname", "Doe");
  sessionStorage.setItem("role", "Recruiter");
});

//Test to check if public profile page is being rendered correctly
test("test if drawer is rendered correctly", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <Drawer />
      </BrowserRouter>
    </UserSession>
  );
  const drawerTitle = screen.getByText(/\bConnectIn\b/);
  const drawerButton = screen.getByRole("button");
  expect(drawerTitle).toBeInTheDocument();
  expect(drawerButton).toBeInTheDocument();
  fireEvent.click(drawerButton);
  expect(screen.getByText(/\bhome\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bNetwork\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bJobs Applied\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bMessages\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bProfile\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bSign Out\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bApplicants\b/)).toBeInTheDocument();
  expect(screen.getByText(/\bPost Job\b/)).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("firstName");
  sessionStorage.removeItem("lastName");
  sessionStorage.removeItem("role");
});
