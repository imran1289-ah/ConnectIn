import React from "react";
import PublicUserProfile from "../components/PublicUserProfile";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";

//Test to check if public profile page is being rendered correctly
test("test if text is rendered correctly in the profile page", () => {
  render(<UserSession>
          <BrowserRouter>
            <PublicUserProfile></PublicUserProfile>
          </BrowserRouter>
          </UserSession>
  );
  const subTitleBio = screen.getByText(/Bio/i);
  const subTitleExperience = screen.getByText(/Experience/i);
  const subTitleEducation = screen.getByText(/Education/i);
  const subTitleSkills = screen.getByText(/Skills/i);
  const subTitleLanguages = screen.getByText(/Languages/i);
  const subTitleVolunteering = screen.getByText(/Volunteering/i);
  expect(subTitleBio).toBeInTheDocument();
  expect(subTitleExperience).toBeInTheDocument();
  expect(subTitleEducation).toBeInTheDocument();
  expect(subTitleSkills).toBeInTheDocument();
  expect(subTitleLanguages).toBeInTheDocument();
  expect(subTitleVolunteering).toBeInTheDocument();
});
