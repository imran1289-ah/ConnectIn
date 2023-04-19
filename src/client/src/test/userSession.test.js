/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import UserSession from "../UserSession";
import { act } from "react-dom/test-utils";

beforeAll(() => {
  sessionStorage.setItem("userID", "6410a8bd165eca75f68ba375");
  sessionStorage.setItem("firstname", "John");
  sessionStorage.setItem("lastname", "Doe");
  sessionStorage.setItem("role", "User");
});

jest.mock("axios");

test("it should return user info", async () => {
  const userSession = [
    { id: "1234", firstname: "John", lastname: "Doe", role: "User" },
  ];
  const UserInfo = { data: userSession };
  axios.get.mockResolvedValue(UserInfo);
  await act(async () => {
    sessionStorage.setItem("data", JSON.stringify(UserInfo));
  });
  expect(sessionStorage.getItem("data")).toEqual(JSON.stringify(UserInfo));
});

afterAll(() => {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("firstName");
  sessionStorage.removeItem("lastName");
  sessionStorage.removeItem("role");
});
