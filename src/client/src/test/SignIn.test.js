/** @jest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SignIn from "../components/SignIn";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";

//Test to see if login title and placeholders were rendered correctly
test("Sign in page header rendered correctly", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </UserSession>
  );
  const title = screen.getByText(/Log in to your account/i);
  const emailplaceholder = screen.getByText(/email/i);
  const passwordplaceholder = screen.getByText(/password/i);
  const donthavaccountText = screen.getByText(/donthave/i);
  const signUpText = screen.getByText(/Sign Up/i);
//   const button = screen.getByRole("button");
  expect(title).toBeInTheDocument();
  expect(emailplaceholder).toBeInTheDocument();
  expect(passwordplaceholder).toBeInTheDocument();
  expect(donthavaccountText).toBeInTheDocument();
  expect(signUpText).toBeInTheDocument();
//   fireEvent.click(button);
//   expect(button).toBeInTheDocument();
});
