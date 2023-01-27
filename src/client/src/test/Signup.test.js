/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../components/SignUp";

test("page renders properly", () => {
  render(<SignUp />);
  const textboxElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(textboxElement).toBeInTheDocument();
  expect(buttonElement).not.toBeDisabled();
});
