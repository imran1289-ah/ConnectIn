import React from "react";
import Footer from "../components/SignupFooter";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";

beforeAll(() => {
  sessionStorage.setItem("userID", "6410a8bd165eca75f68ba375");
  sessionStorage.setItem("firstname", "John");
  sessionStorage.setItem("lastname", "Doe");
  sessionStorage.setItem("role", "User");
});

//Test to check if public profile page is being rendered correctly
test("test if footer is rendered correctly", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    </UserSession>
  );
  const footerHome = screen.getByText(/\bhome\b/);
  const footerAbout = screen.getByText(/\babout\b/);
  const footerEnglish = screen.getByText(/\bEnglish\b/);
  const footerFrench = screen.getByText(/\bFrench\b/);
  const footerTitle = screen.getByText(/\bConnectIn @2023\b/);
  expect(footerHome).toBeInTheDocument();
  expect(footerAbout).toBeInTheDocument();
  expect(footerEnglish).toBeInTheDocument();
  expect(footerFrench).toBeInTheDocument();
  expect(footerTitle).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("firstName");
  sessionStorage.removeItem("lastName");
  sessionStorage.removeItem("role");
});
