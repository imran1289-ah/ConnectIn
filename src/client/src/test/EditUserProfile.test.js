import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import EditUserProfile from "../components/EditUserProfile";
import UserSession from "../UserSession";

//Test to check if user profile page is being rendered correctly
test("test if text is rendered correctly in the user profile page", () => {
  render(
    <UserSession>
      <BrowserRouter>
      <EditUserProfile>
      </EditUserProfile>
    </BrowserRouter>
    </UserSession>
    
  );
  const subTitleEmail = screen.getByText(/Email/i);
  const subTitleBio = screen.getByText(/Bio/i);
  const subTitleExperience = screen.getByText(/Work Experience/i);
  const subTitleEducation = screen.getByText(/Education/i);
  const subTitleSkills = screen.getByText(/Skills/i);
  const subTitleLanguages = screen.getByText(/Languages/i);
  const subTitleVolunteering = screen.getByText(/Volunteering/i);
  const buttonElement = screen.getAllByRole("button");
  expect(subTitleEmail).toBeInTheDocument();
  expect(subTitleBio).toBeInTheDocument();
  expect(subTitleExperience).toBeInTheDocument();
  expect(subTitleEducation).toBeInTheDocument();
  expect(subTitleSkills).toBeInTheDocument();
  expect(subTitleLanguages).toBeInTheDocument();
  expect(subTitleVolunteering).toBeInTheDocument();
  expect(buttonElement[0]).toBeInTheDocument();
});