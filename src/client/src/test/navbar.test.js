import React from "react";
import Navbar from "../components/Navbar";
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
test("test if navbar is rendered correctly", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </UserSession>
  );
  const navbarTitle = screen.getByText(/\bConnectIn\b/);
  expect(navbarTitle).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("firstName");
  sessionStorage.removeItem("lastName");
  sessionStorage.removeItem("role");
});
