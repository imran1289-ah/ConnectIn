import React from "react";
import UserProfile from "../components/UserProfile";
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
test("test if text is rendered correctly in the user profile page", () => {
  render(
    <UserSession>
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    </UserSession>
  );
  const subTitleBio = screen.getByText(/\bBio\b/);
  const subTitleExperience = screen.getByText(/\bExperience\b/);
  const subTitleEducation = screen.getByText(/\bEducation\b/);
  const subTitleSkills = screen.getByText(/\bSkills\b/);
  const subTitleLanguages = screen.getByText(/\bLanguages\b/);
  const subTitleVolunteering = screen.getByText(/\bVolunteering\b/);
  expect(subTitleBio).toBeInTheDocument();
  expect(subTitleExperience).toBeInTheDocument();
  expect(subTitleEducation).toBeInTheDocument();
  expect(subTitleSkills).toBeInTheDocument();
  expect(subTitleLanguages).toBeInTheDocument();
  expect(subTitleVolunteering).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("firstName");
  sessionStorage.removeItem("lastName");
  sessionStorage.removeItem("role");
});
