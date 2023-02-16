/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditJobPosting from "../components/EditJobPosting";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("page renders properly", () => {
  render(
    <BrowserRouter>
      <EditJobPosting />
    </BrowserRouter>
  );
  const heading = screen.getByRole("heading", { level: 3 });
  const title = screen.getByText(/Title/i);
  const description = screen.getByText(/Description/i);
  const annualPay = screen.getByText(/Annual Pay/i);
  const location = screen.getByText(/Location/i);
  expect(heading).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(annualPay).toBeInTheDocument();
  expect(location).toBeInTheDocument();
});
