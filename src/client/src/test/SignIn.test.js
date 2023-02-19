/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "../components/SignIn";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

//Test to see if login title and placeholders were rendered correctly
test("Sign in page header rendered correctly", () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
  const title = screen.getByText(/Log in to your account/i);
  const emailplaceholder = screen.getByText(/email or username/i);
  const passwordplaceholder = screen.getByText(/password/i);
  expect(title).toBeInTheDocument();
  expect(emailplaceholder).toBeInTheDocument();
  expect(passwordplaceholder).toBeInTheDocument();
});
