/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../components/SignUp";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import UserSession from "../UserSession";

test("page renders properly", () => {
  render(<UserSession>
          <BrowserRouter>
          <SignUp />
          </BrowserRouter>
        </UserSession>);
  // Knowing there's more than 1 textbox, the test checks
  // if there's a textbox which has an aria-label value set
  // to firstname.
  const textboxElement = screen.getByRole('textbox', {name: 'firstname'});
  const textboxElement2 = screen.getByRole('textbox', {name: 'Last Name'});
  const textboxElement3 = screen.getByRole('textbox', {name: 'Email'});
  const buttonElement = screen.getByRole('button', {name: 'Sign Up'});
  fireEvent.click(buttonElement);
  expect(textboxElement).toBeInTheDocument();
  expect(textboxElement2).toBeInTheDocument();
  expect(textboxElement3).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
});
