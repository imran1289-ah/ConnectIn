/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from "../components/SignIn";

//Test to see if login title and placeholders were rendered correctly
test("Sign in page header rendered correctly", () => {
  render(<SignIn></SignIn>);
  const title = screen.getByText(/Log in to your account/i);
  const emailplaceholder = screen.getByText(/email or username/i);
  const passwordplaceholder = screen.getByText(/password/i);
  expect(title).toBeInTheDocument();
  expect(emailplaceholder).toBeInTheDocument();
  expect(passwordplaceholder).toBeInTheDocument();
});
