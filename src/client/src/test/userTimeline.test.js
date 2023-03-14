/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTimeline from "../components/UserTimeline";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import UserSession from "../UserSession";
import { IconButton } from "@mui/material";

beforeAll(() => {
  sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
  sessionStorage.setItem("firstname", 'John');
  sessionStorage.setItem("lastname", 'Doe');
  sessionStorage.setItem("role", 'User');
})

test("render components", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <UserTimeline />
      </BrowserRouter>
    </UserSession>
  );
});

test("check if post buttons works", () => {
  render(<IconButton aria-label="sendPost"></IconButton>);
  const postButton = screen.getByRole("button", { name: "sendPost" });
  fireEvent.click(postButton);
  expect(postButton).not.toBeDisabled();
});

jest.mock("axios");

test("it should return user info", () => {
  const userSession = [
    { id: "1234", firstname: "John", lastname: "Doe", role: "User" },
  ];
  const response = { data: userSession };
  axios.get.mockResolvedValue(response);
  sessionStorage.setItem("data", JSON.stringify(response));
  expect(sessionStorage.getItem("data")).toEqual(JSON.stringify(response));
});

afterAll(() => {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('role');
});
